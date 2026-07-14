import { Navigate } from "react-router-dom"; // Declaratively redirects when this component renders.

export default function ProtectedRoute({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) { // Typed wrapper conditionally exposes its child UI.
  if (!isLoggedIn) { // Uses conditional rendering as a route guard.
    return <Navigate to="/login" replace />; // Redirects and replaces history so Back does not reopen the blocked page.
  }
  return <>{children}</>; // An authorized user receives the wrapped route content without an extra DOM node.
}
