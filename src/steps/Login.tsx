import { useNavigate } from "react-router-dom"; // Supplies imperative navigation for event handlers.

export default function Login({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) { // Receives a typed callback to lift auth state to the router demo.
  const navigate = useNavigate(); // Gets a function that can change the in-memory route.

  const handleLogin = () => { // Groups the state change and redirect into one click handler.
    setIsLoggedIn(true); // Updates parent-owned authentication state through props.
    navigate('/dashboard'); // Redirects after login so the protected route can render.
  };

  return (
    <div>
      <p>You are not logged in.</p> {/* Explains why this route is displayed. */}
      <button onClick={handleLogin}>Log In</button> {/* React event handling invokes the login workflow. */}
    </div>
  );
}
