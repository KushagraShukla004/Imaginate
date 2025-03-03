import mongoose from "mongoose";
import dotenv from "dotenv";
import PricingPlan from "../models/pricingPlanModel.js";

dotenv.config(); // Load environment variables

mongoose
  .connect(`${process.env.MONGO_URI}/imagify`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const plans = [
  { id: "starter", name: "Starter Plan", price: 0, credits: 5, isFree: true },
  { id: "basic", name: "Basic", price: 500, credits: 100 },
  { id: "business", name: "Business Plan", price: 4500, credits: 500 },
  { id: "enterprise", name: "Enterprise Plan", price: 45680, credits: 5000 },
];

const seedDB = async () => {
  try {
    await PricingPlan.deleteMany({});
    await PricingPlan.insertMany(plans);
    console.log("✅ Database seeded with pricing plans!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
