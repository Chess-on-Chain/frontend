import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: process.env.JUNO_SATELITE_ID as string,
    },
    source: "dist",
    predeploy: ["npm run build"],
  },
});
