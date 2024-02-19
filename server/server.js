const dotenv = require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app.js");

const DB = process.env.MONGO_URI;

mongoose.connect(DB).then(() => {
  console.log(`DB Connection ✅`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
