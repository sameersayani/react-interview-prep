# React Interview Prep

An interactive React and TypeScript learning repository built for interview preparation and quick revision. Instead of presenting concepts only as notes, the project demonstrates them through small, focused components that can be opened from a lesson menu and tested in the browser.

The examples progress from React fundamentals—props, state, hooks, and reconciliation—to application-level topics such as Context, Redux, server-state management, routing, TypeScript patterns, performance optimization, form inputs, and browser storage.

## What is being done in this repository?

- Each `StepXX_*.tsx` file focuses on one interview topic.
- `App.tsx` provides a sidebar for switching between the lessons.
- The demos intentionally include comparisons such as incorrect versus correct state updates and index keys versus stable keys.
- Browser output and console logs make renders, effects, memoization, throttling, and shared-state updates easier to observe.
- Supporting hooks, Redux slices, context providers, and route components show how real React applications separate responsibilities.

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit and React Redux
- TanStack Query
- react-window

## Quick concept recap

| Concept | Quick definition |
| --- | --- |
| Props | Read-only inputs passed from a parent component to a child component. |
| State | Data owned by a component that causes React to render again when updated. |
| One-way data flow | State moves down the tree through props, while events usually move intent back up through callbacks. |
| `useState` | A hook that adds local, reactive state to a function component. |
| Functional state update | Passing `previousState => nextState` to a setter so queued updates use the latest value. |
| Re-render | React calls a component again to calculate the UI after its state, props, or consumed context changes. |
| `useEffect` | A hook for synchronizing a component with external systems such as timers, event listeners, or network connections. |
| Effect cleanup | A function returned from an effect to stop subscriptions, timers, or other side effects before reruns and unmounting. |
| Virtual DOM | React's in-memory description of the UI, compared between renders to determine necessary DOM updates. |
| Reconciliation | The process React uses to match old and new element trees and update the real DOM efficiently. |
| Keys | Stable identities that help React correctly match items in a rendered list. |
| `useRef` | A hook that keeps a mutable value across renders without causing a re-render; it is also used to access DOM elements. |
| `useMemo` | Caches a computed value until one of its dependencies changes. |
| `useCallback` | Caches a function reference until one of its dependencies changes. |
| `React.memo` | Skips a child render when its props are shallowly equal to the previous props. |
| Custom hook | A reusable function beginning with `use` that composes React hooks and stateful behavior. |
| Debouncing | Waits until rapid events stop for a specified period before publishing the latest value. |
| Throttling | Limits a frequently occurring update to at most once per specified interval. |
| Context API | Shares a value with descendants without passing it manually through every intermediate component. |
| Redux | A predictable global client-state container based on a store, actions, reducers, dispatch, and selectors. |
| TanStack Query | Manages asynchronous server state, including fetching, caching, loading states, mutations, and refetching. |
| Client-side routing | Maps URLs to React components without requiring a full-page reload. |
| Generic component | A TypeScript component that preserves type safety while working with several data types. |
| Code splitting | Loads part of the JavaScript bundle only when that part of the UI is needed. |
| List virtualization | Renders only visible rows from a large collection to reduce DOM work. |
| Controlled input | A form element whose current value is stored in React state and updated through an event handler. |
| Uncontrolled input | A form element that keeps its value in the DOM and is read when needed, commonly through a ref. |
| `localStorage` | Persistent browser key-value storage that remains available after refreshes, tab closures, and browser restarts. |
| `sessionStorage` | Browser key-value storage scoped to the current tab and cleared when that tab's session ends. |
| Cookie | A small string stored by the browser that can have an expiry and may be sent with matching HTTP requests. |

## Step-by-step guide

### Step 1 — Props and State

`Step01_PropsState.tsx` introduces one-way data flow. The parent owns the counter state, passes the current value and a label to `CounterDisplay` as typed props, and updates its state through increment and decrement event handlers.

### Step 2 — `useState` and Re-renders

`Step02_UseStateRerender.tsx` demonstrates React's state snapshot and batching behavior. It compares two updates based on the same closed-over `count` value with two functional updates, showing why the former increments once while the latter correctly increments twice.

### Step 3 — `useEffect`

`Step03_UseEffect.tsx` uses an effect to create and clean up an interval based on an `isRunning` dependency. A second effect with an empty dependency array demonstrates mount-time behavior, while the buttons show how state changes control the effect.

### Step 4 — Virtual DOM and Reconciliation

`Step04_VirtualDom.tsx` renders the same changing collection twice: once using array indexes as keys and once using stable item IDs. Removing or shuffling items reveals why stable keys are necessary to preserve the correct DOM and component identity.

### Step 5 — Refs and Memoization

`Step05_RefsMemo.tsx` uses `useRef` to focus an input directly, `useMemo` to avoid repeating an expensive Fibonacci calculation after unrelated renders, and `useCallback` with `React.memo` to keep a child button's function prop stable.

### Step 6 — Custom Hooks

`Step06_CustomHooks.tsx` consumes `useWindowWidth` in both a parent and child component. The custom hook owns resize state, subscribes to the browser's `resize` event, and removes the listener during effect cleanup.

### Step 7 — Debounce and Throttle

`Step07_Debounce_and_Throttle.tsx` contains two rate-limiting demos. Search input is debounced before the simulated search runs, while mouse coordinates are throttled so raw pointer events happen continuously but the displayed marker updates at a controlled rate.

Supporting files:

- `hooks/useDebounce.ts` delays publishing a changing value until the delay passes without another change.
- `hooks/useThrottle.ts` publishes immediately when allowed and schedules a trailing update when events arrive too quickly.

### Step 8 — Context API

`Step08_Context.tsx` demonstrates sharing theme state through deeply nested components without prop drilling. Only `Level3` consumes the context, while memoized intermediate levels simply render their children.

Supporting files:

- `context/ThemeContext.tsx` defines the context, owns the light/dark state, and exposes a provider and toggle action.
- `hooks/useTheme.ts` wraps `useContext` and throws a helpful error when called outside `ThemeProvider`.

### Step 9 — Redux Toolkit

`Step09_Redux.tsx` dispatches generated actions and selects specific values from the Redux store. Separate memoized counter and user displays help show that selectors subscribe components only to the state they need.

Supporting files:

- `redux/store.ts` configures the store and derives the `RootState` TypeScript type.
- `redux/counterSlice.ts` defines increment, decrement, and increment-by-amount reducers and actions.
- `redux/userSlice.ts` defines the user-name state and its update action.

### Step 10 — TanStack Query

`Step10_TanStackQuery.tsx` fetches todos from JSONPlaceholder with `useQuery`, displays request and background-fetch states, and submits a new todo with `useMutation`. After a successful mutation it invalidates the todos query so TanStack Query refetches the server data.

### Step 11 — Routing

`Step11_Routing.tsx` uses a `MemoryRouter` so routing can be demonstrated inside a lesson without taking over the entire application URL. It covers nested routes, an index route, URL parameters, navigation, layouts, and a protected dashboard route.

Supporting route components include `Layout.tsx`, `Home.tsx`, `Users .tsx`, `UserDetail.tsx`, `Login.tsx`, `ProtectedRoute.tsx`, and `Dashboard.tsx`.

### Step 12 — TypeScript Patterns in React

`Step12_TypeScriptPatterns.tsx` demonstrates typing `children` with `React.ReactNode`, input and mouse events, generic component props, a tuple-returning custom hook, and optional props with default values. Its generic `List<T>` works with both strings and user objects while retaining type inference.

### Step 13 — Performance and Common Gotchas

`Step13_Performance.tsx` combines several optimization techniques:

- It compares an inline object prop with a `useMemo`-stabilized prop passed to a memoized child.
- It loads `HeavyComponent.tsx` on demand with `React.lazy` and displays a `Suspense` fallback.
- It compares mounting 10,000 ordinary DOM rows with rendering a virtualized list through `react-window`.
- It records approximate render timing to make the difference observable.

### Step 14 — Controlled Inputs, Uncontrolled Inputs, and Browser Storage

`Step14_ControlledStorage.tsx` compares two ways of working with form elements and three browser persistence mechanisms:

- The controlled input keeps its value in React state and updates it on every `onChange` event, making React the source of truth.
- The uncontrolled input keeps its live value in the DOM. A `useRef` provides direct access when the user clicks the read button.
- The storage demo saves the controlled value under `demoKey` and reads it back from `localStorage`, `sessionStorage`, and a cookie.
- Separate React state values display the latest value read from each storage mechanism.
- The cookie example safely encodes/decodes its value, uses a one-day lifetime, and searches `document.cookie` for the matching key.

This step highlights the persistence differences: `localStorage` survives browser restarts, `sessionStorage` lasts for the current tab session, and cookies support expiry rules and can also participate in HTTP communication.

## Application structure

```text
src/
├── App.tsx                # Lesson selector and active step renderer
├── main.tsx               # React root and global providers
├── context/               # Theme context and provider
├── hooks/                 # Reusable custom hooks
├── redux/                 # Store and Redux Toolkit slices
└── steps/                 # Individual lessons and routing helpers
```

`main.tsx` creates the React root and wraps the app with `StrictMode`, `QueryClientProvider`, and the Redux `Provider`. This makes development checks, the TanStack Query cache, and the Redux store available throughout the component tree.

## Running the project

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, then use the sidebar to move through each topic. Keep the browser console open for demos that log renders, effects, calculations, and throttled events.

Other useful commands:

```bash
npm run build
npm run lint
npm run preview
```

## Suggested interview revision approach

For each lesson, first explain the concept without running the code. Then predict the result of each interaction, test it in the browser, and use the source to explain why React behaves that way. Pay particular attention to stale state, effect cleanup, stable keys, referential equality, choosing the right state-management tool, and avoiding unnecessary rendering.
