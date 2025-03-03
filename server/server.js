import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// ✅ Connect to MongoDB
await connectDB();

// ✅ CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Update for production
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// ✅ JSON Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT = ${PORT}`);
});
