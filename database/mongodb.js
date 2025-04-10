import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error(
    "mongoDb uri is not present, please define monogoDb uri in .env.<production | development>.local first"
  );
}

const connectDb = async () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log(`connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to Database:", error);
    process.exit(1);
  }
};

export default connectDb;
