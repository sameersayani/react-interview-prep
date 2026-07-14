import { Link, Outlet } from "react-router-dom"; // Link navigates client-side; Outlet renders the matched nested route.

export default function Layout() { // Shared route layout keeps navigation visible across child pages.
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> {/* Changes routes without a full-page browser reload. */}
        <Link to="/users">Users</Link> {/* Targets the nested users route. */}
        <Link to="/dashboard">Dashboard</Link> {/* Targets the protected route. */}
        <Link to="/login">Login</Link> {/* Targets the authentication demo route. */}
      </nav>
      <div style={{ padding: '1rem' }}>
        <Outlet /> {/* Placeholder where React Router renders the matching child route. */}
      </div>
    </div>
  );
}
