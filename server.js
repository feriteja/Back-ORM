const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const db = require("./db.config");
db.authenticate()
  .then((res) => console.log("Connection has been established successfully."))
  .catch((err) => console.log(err));

const app = require("./app");

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
