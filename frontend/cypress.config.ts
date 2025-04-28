import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '2qzwcr',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
