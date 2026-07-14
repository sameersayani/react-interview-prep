import { useContext } from "react"; // Reads a value from the nearest matching React context provider.
import { ThemeContext } from "../context/ThemeContext"; // Imports the shared theme context object.

export function useTheme() { // Custom hook provides one safe, reusable context-access API.
    const context = useContext(ThemeContext); // Subscribes the component to theme context changes.
    if (!context) { // Detects use outside the provider, where the context default is undefined.
        throw new Error("useTheme must be used within a ThemeProvider"); // Fails early with an actionable developer error.
    }
    return context; // Returns the typed theme value and toggle function.
}
