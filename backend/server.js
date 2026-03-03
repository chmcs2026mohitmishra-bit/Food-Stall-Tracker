import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Better CORS Config

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/foodstall")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("DB Connection Error:", err));

// Routes
app.use("/food", foodRoutes);

// Debug Route - to check all routes working
app.get("/food/test", (req, res) => {
  res.json({ message: "Food API is working" });
});

// Root Test Route
app.get("/", (req, res) => {
  res.send("Food Stall Tracker Backend Running");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
