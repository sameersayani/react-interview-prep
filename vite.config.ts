import { defineConfig } from 'vite' // Gives this build configuration type checking and editor help (Vite concept).
import react from '@vitejs/plugin-react' // Adds JSX transformation and React Fast Refresh during development.

// https://vite.dev/config/
export default defineConfig({ // Exports the configuration that Vite reads when it starts or builds.
  plugins: [react()], // Activates the React plugin for every TSX component in this project.
})
