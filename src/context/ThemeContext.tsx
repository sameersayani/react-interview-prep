import { useState, createContext, type ReactNode } from "react"; // Imports state/context APIs and a type for renderable children.

export type Theme = "light" | "dark"; // Union type prevents unsupported theme strings.

export interface ThemeContextType { // Defines everything consumers may read from theme context.
  theme: Theme; // Exposes the currently selected theme.
  toggleTheme: () => void; // Exposes an action without leaking the state setter.
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // Creates a context whose missing-provider state is detectable.

export const ThemeProvider = ({ children }: { children: ReactNode }) => { // Provider owns shared state and wraps any renderable descendants.
    const [theme, setTheme] = useState<Theme>("light"); // Stores shared theme state, initially light.

    const toggleTheme = () => { // Defines the command exposed to context consumers.
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // Functional update derives next state safely from prior state.
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> {/* Broadcasts state/actions to the descendant component tree. */}
            {children} {/* Preserves and renders the UI wrapped by this provider. */}
        </ThemeContext.Provider>
    );
};
