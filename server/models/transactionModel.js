import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], required: true },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel;
