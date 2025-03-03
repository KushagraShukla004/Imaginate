import mongoose from "mongoose";

const PricingPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g., "starter", "basic"
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Price in INR
  credits: { type: Number, required: true }, // Credits provided
  isFree: { type: Boolean, default: false }, // Flag for free plans
});

const PricingPlan = mongoose.model("PricingPlan", PricingPlanSchema);
export default PricingPlan;
