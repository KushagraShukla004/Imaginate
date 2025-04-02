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
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"]; // Use CLIENT_URL from .env
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

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
