import Stripe from "stripe";
import TransactionModel from "../models/transactionModel.js";
import userModel from "../models/userModel.js";
import PricingPlan from "../models/pricingPlanModel.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const plan = await PricingPlan.findById(planId);
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });

    // ✅ Handle free plans directly
    if (plan.isFree) {
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $inc: { creditBalance: plan.credits } }, // Correct field
        { new: true }
      );
      return res.json({ success: true, creditBalance: user.creditBalance });
    }

    // ✅ Create a new transaction record
    const transaction = new TransactionModel({
      userId,
      amount: plan.price,
      status: "pending",
      sessionId: "",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: plan.name },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      metadata: { transactionId: transaction._id.toString(), userId, planId },
    });

    transaction.sessionId = session.id;
    await transaction.save();

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Session ID required" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    const transaction = await TransactionModel.findOne({ sessionId });
    if (!transaction || transaction.status === "completed") {
      return res.json({
        success: false,
        message: "Transaction already processed or not found",
      });
    }

    // ✅ Update transaction status
    transaction.status = "completed";
    await transaction.save();

    // ✅ Update user creditBalance
    const user = await userModel.findById(session.metadata.userId);
    const plan = await PricingPlan.findById(session.metadata.planId);

    if (user && plan) {
      user.creditBalance += plan.credits; // Correct field
      await user.save();
      return res.json({ success: true, creditBalance: user.creditBalance });
    } else {
      return res.status(400).json({ success: false, message: "User or plan not found" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};
