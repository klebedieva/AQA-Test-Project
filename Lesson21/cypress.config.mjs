import { defineConfig } from 'cypress';
import * as path from 'path';
import * as fs from 'fs';

const getConfigFile = (env) => {
  const configFilePath = path.join('cypress', 'fixtures', `cypress.${env}.config.json`);
  return (fs.readFileSync(configFilePath)).toString(); 
}

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportFilename: '[status]_[datetime]-[name]-report',
    overwrite: false,
    html: true,
    json: true,
    reportDir: 'mochawesome-report',
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      const configOverrides = JSON.parse(getConfigFile(config.env.TEST_ENV)); 
      config = { ...config, ...configOverrides }; 
      return config;
    },
  },
});