const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      
    },
    allureResulsPath: "allure-results",
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
    baseUrl: "https://opensource-demo.orangehrmlive.com",
  },
});
