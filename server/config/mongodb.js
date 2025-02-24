import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/imagify`);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
