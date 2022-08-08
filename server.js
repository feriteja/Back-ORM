const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const db = require("./db.config");
const app = require("./app");

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
