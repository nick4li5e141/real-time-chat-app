// Description: this file is the configuration file for Vite, which is a build tool for modern web applications. It specifies the plugins to be used and the loader for JavaScript files. 
// In this case, it uses the React plugin and sets the loader for JavaScript files to "jsx" to enable support for JSX syntax in React components.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
