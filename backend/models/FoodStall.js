import mongoose from "mongoose";

const foodStallSchema = new mongoose.Schema(
  {
    shopname: {
      type: String,
      required: true,
    },

    ownername: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    contactno: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    weeklyOff: {
      type: String,
      required: true,
    },

    foods: [
      {
        foodname: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { versionKey: false }
);

const FoodStall = mongoose.model("FoodStall", foodStallSchema);

export default FoodStall;