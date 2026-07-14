import { StrictMode } from 'react' // Enables extra development checks for unsafe React behavior.
import { createRoot } from 'react-dom/client' // Creates a React 18+ root in the browser DOM.
import { Provider } from 'react-redux' // Makes the Redux store available to descendant components.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Provides a shared server-state cache.
import { store } from './redux/store.ts' // Imports this app's configured global Redux store.
import './index.css' // Loads global styles as a Vite side-effect import.
import App from './App.tsx' // Imports the root application component.

const queryClient = new QueryClient(); // Creates one stable query cache for the lifetime of the app.

createRoot(document.getElementById('root')!).render( // Finds the HTML mount point (`!` says it exists) and starts rendering.
  <StrictMode> {/* Runs development-only React checks; it may intentionally repeat renders/effects. */}
    <QueryClientProvider client={queryClient}> {/* Supplies TanStack Query's cache through React context. */}
      <Provider store={store}> {/* Supplies Redux state and dispatch through React context. */}
        <App /> {/* Renders the root of our component tree. */}
      </Provider> {/* Ends the Redux provider scope. */}
    </QueryClientProvider> {/* Ends the server-state provider scope. */}
  </StrictMode>,
)
