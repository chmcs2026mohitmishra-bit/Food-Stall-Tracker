import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import api from "../lib/axios";
import toast from "react-hot-toast";

const StallCard = ({ item, fetchData, setEditData }) => {
  const navigate = useNavigate();
  const [showAddFood, setShowAddFood] = useState(false);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState("");

  // DELETE SHOP with confirmation
  const deleteItem = async () => {
    if (!window.confirm(`Are you sure you want to delete ${item.shopname}?`)) return;

    try {
      await api.delete(`/delete/${item._id}`);
      toast.success("Deleted Successfully");
      if (fetchData) fetchData();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  // ADD FOOD TO SHOP
  const addFood = async () => {
    if (!newFoodName || !newFoodPrice) {
      toast.error("Enter food name and price");
      return;
    }
    try {
      await api.post(`/add-food/${item._id}`, {
        foodname: newFoodName,
        price: Number(newFoodPrice),
      });
      toast.success("Food Added");
      setShowAddFood(false);
      setNewFoodName("");
      setNewFoodPrice("");
      if (fetchData) fetchData();
    } catch (err) {
      toast.error("Operation Failed");
    }
  };

  // REMOVE FOOD FROM SHOP
  const removeFood = async (foodIndex) => {
    try {
      const updatedFoods = [...item.foods];
      updatedFoods.splice(foodIndex, 1);

      await api.put(`/update/${item._id}`, { ...item, foods: updatedFoods });
      toast.success("Food Removed");
      if (fetchData) fetchData();
    } catch (err) {
      toast.error("Remove Failed");
    }
  };

 return (
  <div className="card bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 text-gray-200">

    {item.image && (
      <figure className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.shopname}
          className="h-48 w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
          onClick={() => navigate(`/stall/${item._id}`)}
        />
        <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition"></div>
      </figure>
    )}

    <div className="card-body">

      {/* Shop Name */}
      <h2
        className="card-title text-lg font-bold text-primary cursor-pointer hover:underline"
        onClick={() => navigate(`/stall/${item._id}`)}
      >
        {item.shopname}
      </h2>

      {/* Address */}
      <p className="text-sm text-gray-400">{item.address}</p>

      {/* Food List */}
      <div className="mt-3 space-y-1">
        {item.foods?.map((f, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm bg-white/5 px-2 py-1 rounded-lg"
          >
            <span className="text-gray-300">
              {f.foodname} - <span className="text-green-400">₹ {f.price}</span>
            </span>

            <FiMinusCircle
              size={18}
              className="text-red-400 cursor-pointer hover:text-red-600 transition"
              onClick={() => removeFood(i)}
              title="Remove Food"
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="card-actions justify-end mt-4 gap-2">

        {setEditData && (
          <button
            className="btn btn-sm bg-yellow-500/20 border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black btn-circle transition"
            onClick={() => setEditData(item)}
            title="Edit Shop"
          >
            <FiEdit size={18} />
          </button>
        )}

        <button
          className="btn btn-sm bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white btn-circle transition"
          onClick={deleteItem}
          title="Delete Shop"
        >
          <FiTrash2 size={18} />
        </button>

        <button
          className="btn btn-sm bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-black btn-circle transition"
          onClick={() => setShowAddFood(!showAddFood)}
          title="Add Food"
        >
          <FiPlusCircle size={18} />
        </button>

      </div>

      {/* Add Food Section */}
      {showAddFood && (
        <div className="mt-4 space-y-2 bg-white/5 p-3 rounded-xl border border-white/10">

          <input
            type="text"
            placeholder="Food Name"
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="input input-bordered w-full bg-slate-800 text-white border-white/20"
          />

          <input
            type="number"
            placeholder="Price"
            value={newFoodPrice}
            onChange={(e) => setNewFoodPrice(e.target.value)}
            className="input input-bordered w-full bg-slate-800 text-white border-white/20"
          />

          <button
            className="btn btn-sm btn-success w-full hover:scale-105 transition"
            onClick={addFood}
          >
            Add Food
          </button>

        </div>
      )}
    </div>
  </div>
);
};

export default StallCard;
