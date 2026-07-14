import { useParams } from "react-router-dom"; // Reads dynamic parameters captured by the current route.

export default function UserDetail() { // Route component for a specific user URL.
    const { userId } = useParams<{ userId: string }>(); // Extracts and types the `:userId` path segment.
    return <p>Viewing user #{userId}</p>; // Interpolates the URL parameter into JSX.
}
