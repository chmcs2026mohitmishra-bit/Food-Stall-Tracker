import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("DB Connection Error:", err));

app.use("/food", foodRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

