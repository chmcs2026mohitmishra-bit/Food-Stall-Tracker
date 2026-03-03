import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopname: "",
    ownername: "",
    address: "",
    contactno: "",
    rating: 0,
    description: "",
    image: "",
    foods: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [newFood, setNewFood] = useState({ foodname: "", price: "" });

  // Fetch shop details
  const fetchShop = async () => {
    try {
      const res = await api.get(`/stalls`);
      const shop = res.data.find((s) => s._id === id);
      if (shop) setForm(shop);
    } catch (err) {
      toast.error("Failed to load shop data");
    }
  };

  useEffect(() => {
    fetchShop();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => setImageFile(e.target.files[0]);

  const uploadImageToBase64 = () => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  // Add new food to local form only
  const addFood = () => {
    if (!newFood.foodname || !newFood.price) return toast.error("Enter food name and price");
    setForm({ ...form, foods: [...form.foods, { ...newFood, price: Number(newFood.price) }] });
    setNewFood({ foodname: "", price: "" });
  };

  // Remove food from local form
  const removeFood = (index) => {
    const updatedFoods = form.foods.filter((_, i) => i !== index);
    setForm({ ...form, foods: updatedFoods });
  };

  // Submit update
  const submitUpdate = async () => {
    try {
      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadImageToBase64();

      await api.put(`/update/${id}`, { ...form, image: imageUrl });
      toast.success("Shop Updated Successfully");
      navigate("/");
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200 py-10">
    <div className="max-w-4xl mx-auto px-6">
      
      <div className="bg-slate-800/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-primary mb-6">
          Edit Shop: {form.shopname}
        </h2>

        <div className="grid gap-4">

          {/* Inputs */}
          <input
            name="shopname"
            value={form.shopname}
            onChange={handleChange}
            placeholder="Shop Name"
            className="input w-full bg-slate-900 text-white border border-white/20 focus:border-primary"
          />

          <input
            name="ownername"
            value={form.ownername}
            onChange={handleChange}
            placeholder="Owner Name"
            className="input w-full bg-slate-900 text-white border border-white/20 focus:border-primary"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="input w-full bg-slate-900 text-white border border-white/20 focus:border-primary"
          />

          <input
            name="contactno"
            value={form.contactno}
            onChange={handleChange}
            placeholder="Contact No"
            className="input w-full bg-slate-900 text-white border border-white/20 focus:border-primary"
          />

          {/* Rating */}
          <div>
            <label className="block mb-2 font-semibold">
              Rating
            </label>
            <div className="flex gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer transition ${
                    form.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-600 hover:text-yellow-300"
                  }`}
                  onClick={() => setForm({ ...form, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea w-full bg-slate-900 text-white border border-white/20 focus:border-primary"
          />

          {/* Image */}
          <div>
            <label className="block mb-2 font-semibold">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="file-input w-full bg-slate-900 text-white border border-white/20"
            />
            {imageFile && (
              <p className="text-sm text-green-400 mt-1">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          {/* Foods Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Foods
            </h3>

            {form.foods.map((f, i) => (
              <div
                key={i}
                className="flex gap-2 items-center mb-3"
              >
                <input
                  type="text"
                  value={f.foodname}
                  onChange={(e) => {
                    const updatedFoods = [...form.foods];
                    updatedFoods[i].foodname = e.target.value;
                    setForm({ ...form, foods: updatedFoods });
                  }}
                  className="input w-1/2 bg-slate-900 text-white border border-white/20"
                />

                <input
                  type="number"
                  value={f.price}
                  onChange={(e) => {
                    const updatedFoods = [...form.foods];
                    updatedFoods[i].price = Number(e.target.value);
                    setForm({ ...form, foods: updatedFoods });
                  }}
                  className="input w-1/2 bg-slate-900 text-white border border-white/20"
                />

                <button
                  className="btn btn-sm btn-error hover:scale-105 transition"
                  onClick={() => removeFood(i)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add new food */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Food Name"
                value={newFood.foodname}
                onChange={(e) =>
                  setNewFood({ ...newFood, foodname: e.target.value })
                }
                className="input w-1/2 bg-slate-900 text-white border border-white/20"
              />

              <input
                type="number"
                placeholder="Price"
                value={newFood.price}
                onChange={(e) =>
                  setNewFood({ ...newFood, price: e.target.value })
                }
                className="input w-1/2 bg-slate-900 text-white border border-white/20"
              />

              <button
                className="btn btn-primary hover:scale-105 transition"
                onClick={addFood}
              >
                Add
              </button>
            </div>
          </div>

          {/* Update Button */}
          <button
            className="btn btn-success mt-6 hover:scale-105 transition"
            onClick={submitUpdate}
          >
            Update Shop
          </button>

        </div>
      </div>
    </div>
  </div>
);
};

export default EditPage;
