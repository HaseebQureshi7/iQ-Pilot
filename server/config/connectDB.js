import mongoose from "mongoose";

const DB = process.env.MONGO_URI;
console.log(process.env.PORT);
async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DB");
  } catch (err) {
    console.log(err);
    console.log("DB ERROR!!!");
  }
}

export default ConnectDB;
