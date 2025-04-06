import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      // implement node event listeners here
    },
  },
});