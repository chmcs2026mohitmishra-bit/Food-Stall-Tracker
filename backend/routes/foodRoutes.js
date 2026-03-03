import express from "express";

import {
  getAllStalls,
  getSingleStall,
  addStall,
  addFood,
  updateStall,
  deleteStall,
  filterByRating,
  priceUnder,
  averageRating
} from "../controllers/foodController.js";

const router = express.Router();


router.get("/stalls", getAllStalls);

router.get("/stalls/:id", getSingleStall);

router.post("/add", addStall);

router.post("/add-food/:shopId", addFood);

router.put("/update/:id", updateStall);

router.delete("/delete/:id", deleteStall);

router.get("/filter/rating/:value", filterByRating);

router.get("/price-under/:amount", priceUnder);

router.get("/average-rating", averageRating);


// 404 handler
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.originalUrl,
  });
});

export default router;