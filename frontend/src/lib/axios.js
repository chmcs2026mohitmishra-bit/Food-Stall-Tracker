import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/food",
});

export default api;
