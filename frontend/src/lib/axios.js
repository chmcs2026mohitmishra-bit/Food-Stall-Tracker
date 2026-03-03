import axios from "axios";

const api = axios.create({
  baseURL: "https://food-stall-tracker.onrender.com/food",
});

export default api;

