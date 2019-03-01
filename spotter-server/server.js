require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);



app.listen(PORT, () => {
  console.log("Spotter server listening on port " + PORT);
});
