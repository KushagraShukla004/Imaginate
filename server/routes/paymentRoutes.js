import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/paymentController.js";
import userAuth from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", userAuth, createCheckoutSession);
paymentRouter.post("/verify-payment", userAuth, verifyPayment); // ✅ New route for payment verification

export default paymentRouter;
