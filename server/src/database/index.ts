const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile.ts")[environment];

export const database = require("knex")(config);
