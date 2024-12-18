//  mongo db connect uri  -->> mongosh "mongodb+srv://cluster0.hh0qk.mongodb.net/" --apiVersion 1 --username prasadsukumar8 --password o6HIssyL91TYKIMY

import dotenv from "dotenv";
import { Mongoose, connect } from "mongoose";

dotenv.config();
const mongodb = async () => {
  try {
    await connect(process.env.MONGOOSE_URI);
    console.log("mongodb is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default mongodb;
