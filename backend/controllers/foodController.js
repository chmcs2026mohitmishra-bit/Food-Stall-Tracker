import FoodStall from "../models/FoodStall.js";


// GET ALL STALLS
export const getAllStalls = async (req, res) => {
  try {
    const stalls = await FoodStall.find();
    res.status(200).json(stalls);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// GET SINGLE STALL
export const getSingleStall = async (req, res) => {
  try {
    const stall = await FoodStall.findById(req.params.id);

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json(stall);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ADD NEW STALL
export const addStall = async (req, res) => {
  try {
    const newStall = new FoodStall(req.body);

    const savedStall = await newStall.save();

    res.status(201).json({
      success: true,
      data: savedStall,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ADD FOOD ITEM
export const addFood = async (req, res) => {
  try {

    const { foodname, price } = req.body;

    const stall = await FoodStall.findById(req.params.shopId);

    if (!stall) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    stall.foods.push({ foodname, price });

    await stall.save();

    res.status(200).json({
      success: true,
      data: stall,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// UPDATE STALL
export const updateStall = async (req, res) => {
  try {

    const updatedStall = await FoodStall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStall) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedStall,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// DELETE STALL
export const deleteStall = async (req, res) => {
  try {

    const deletedStall = await FoodStall.findByIdAndDelete(req.params.id);

    if (!deletedStall) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// FILTER BY RATING
export const filterByRating = async (req, res) => {
  try {

    const stalls = await FoodStall.find({
      rating: { $gte: Number(req.params.value) },
    });

    res.status(200).json(stalls);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// FILTER BY PRICE
export const priceUnder = async (req, res) => {
  try {

    const stalls = await FoodStall.find({
      price: { $lte: Number(req.params.amount) },
    });

    res.status(200).json(stalls);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// AVERAGE RATING
export const averageRating = async (req, res) => {
  try {

    const result = await FoodStall.aggregate([
      {
        $group: {
          _id: "$shopname",
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};