import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';

// Shape of a single todo item, matching jsonplaceholder's API response
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// Fetches the todo list from the public test API.
// This is just a plain async function — TanStack Query calls it for us,
// it doesn't need to be a hook itself.
async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  return response.json();
}

// Sends a new todo to the API via POST.
// jsonplaceholder doesn't actually save it permanently, but it returns
// a fake success response with an id, which is enough to demo the pattern.
async function addTodo(title: string): Promise<Todo> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });
  return response.json();
}

export default function Step10_TanStackQuery() {
    // Local state just for the "add todo" text input
    const [newTodoTitle, setNewTodoTitle] = useState('');
    
    // useQuery must be called INSIDE the component, during render —
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['todos'], // unique cache key — any component using this
        queryFn: fetchTodos, // same key shares the same cached data the function TanStack Query calls to get data
    });

    // Gives access to the shared query cache, so we can manually
  // mark the 'todos' query as stale after a successful mutation
    const queryClient = useQueryClient();

    // Sets up the "add todo" mutation (a POST request, not just reading data)
    const mutation = useMutation({
        mutationFn: addTodo, // the function that actually performs the POST
        onSuccess: () => {
            // After successfully adding a todo, tell TanStack Query that
            // the 'todos' query is now stale — this triggers an automatic
            // refetch, so our list reflects the "new" data (or at least
            // refetches, since jsonplaceholder won't really persist it)
            // Invalidate and refetch the 'todos' query to get the updated list
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // if fetch failed entirely, show an error message
    if (isError) {
        return <p>Error: {error instanceof Error ? error.message : 'Something went wrong'}</p>;
    }

    return (
         <div>
      <h2>Step 10: TanStack Query</h2>

      {/* isFetching is true during ANY request in flight — including
          background refetches of data we're already showing.
          isLoading only covers the very first load. */}
      {isFetching && <p>🔄 refreshing...</p>}

      <ul>
        {data?.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="New todo title..."
      />
      <button
        onClick={() => {
          mutation.mutate(newTodoTitle);  // triggers the POST request
          setNewTodoTitle('');            // clear input after submitting
        }}
      >
        Add Todo
      </button>

      {/* Optional: show mutation's own loading/success state */}
      {mutation.isPending && <p>Adding todo...</p>}
      {mutation.isSuccess && <p>Todo added! (list will refresh)</p>}
    </div>
    );
}

