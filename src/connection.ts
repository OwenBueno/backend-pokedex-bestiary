import mongoose from "mongoose";
import { config } from "dotenv";

config();

const uri = process.env.URI ||"";

let retries = 0;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(uri);

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);

      if (retries < 3) {
        console.log(`Retrying connection... (Attempt ${retries + 1})`);
        retries++;
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      } else {
        console.error("Failed to connect to MongoDB after 3 attempts. Exiting program.");
        process.exit(1);
      }
    });
    db.once("start", () => {
      console.log("Connected to MongoDB!");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
connectWithRetry();
export { mongoose };
