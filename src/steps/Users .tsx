import { Link } from "react-router-dom";
// Hardcoded fake user data, just for demo purposes
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export default function Users(){
    return(
        <div>
            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}