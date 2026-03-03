import { useEffect, useState } from "react";
import API from "../lib/axios";
import toast from "react-hot-toast";

const FoodForm = ({
  fetchData,
  editData,
  setEditData = () => { }
}) => {

  const initialState = {
    shopname: "",
    ownername: "",
    address: "",
    contactno: "",
    rating: 0,
    description: "",
    image: "",
    openingTime: "",
    closingTime: "",
    weeklyOff: "",
  };

  const [form, setForm] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToBase64 = () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Submit Started");

      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImageToBase64();
      }

      const finalData = { ...form, image: imageUrl };

      let response;

     
      if (editData) {
        response = await API.put(`/update/${editData._id}`, finalData);
        toast.success("Updated Successfully");
      }
      
      else {
        response = await API.post("/add", finalData);
        toast.success("Shop Added Successfully");
      }

      
      if (fetchData) {
        await fetchData();
      }

      
      setForm(initialState);
      setImageFile(null);
      setEditData(null);

      console.log("Form Reset Done");

    } catch (err) {
      console.log("ERROR OCCURRED:", err);
      toast.error("Operation Failed");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-10 px-4">
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 text-gray-200">

      <h2 className="text-2xl font-bold mb-6 text-primary">
        {editData ? "✏ Edit Shop" : "➕ Add New Food Stall"}
      </h2>

      <form onSubmit={submitForm} className="grid md:grid-cols-2 gap-6">

        {/* Shop Name */}
        <input
          name="shopname"
          value={form.shopname}
          onChange={handleChange}
          placeholder="Shop Name"
          className="input w-full bg-slate-800 text-white border border-white/20 focus:border-primary focus:outline-none"
          required
        />

        {/* Owner Name */}
        <input
          name="ownername"
          value={form.ownername}
          onChange={handleChange}
          placeholder="Owner Name"
          className="input w-full bg-slate-800 text-white border border-white/20 focus:border-primary"
        />

        {/* Address */}
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="input w-full bg-slate-800 text-white border border-white/20 focus:border-primary"
        />

        {/* Contact */}
        <input
          name="contactno"
          value={form.contactno}
          onChange={handleChange}
          placeholder="Contact No"
          className="input w-full bg-slate-800 text-white border border-white/20 focus:border-primary"
        />

        {/* Rating */}
        <div>
          <label className="block mb-2 font-semibold text-gray-300">
            Select Rating (1 to 5)
          </label>

          <div className="flex gap-2 text-3xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`cursor-pointer transition-all duration-200 ${
                  form.rating >= star
                    ? "text-yellow-400 scale-110"
                    : "text-gray-600 hover:text-yellow-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-sm mt-2 text-gray-400">
            Selected Rating: {form.rating || "Not Selected"}
          </p>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Shop Description"
          className="textarea w-full bg-slate-800 text-white border border-white/20 focus:border-primary md:col-span-2"
        ></textarea>

        {/* Opening Time */}
        <div>
          <label className="block mb-2 font-semibold text-gray-300">
            Opening Time
          </label>
          <input
            type="time"
            name="openingTime"
            value={form.openingTime}
            onChange={handleChange}
            className="input w-full bg-slate-800 text-white border border-white/20"
            required
          />
        </div>

        {/* Closing Time */}
        <div>
          <label className="block mb-2 font-semibold text-gray-300">
            Closing Time
          </label>
          <input
            type="time"
            name="closingTime"
            value={form.closingTime}
            onChange={handleChange}
            className="input w-full bg-slate-800 text-white border border-white/20"
            required
          />
        </div>

        {/* Weekly Off */}
        <select
          name="weeklyOff"
          value={form.weeklyOff}
          onChange={handleChange}
          className="select w-full bg-slate-800 text-white border border-white/20"
          required
        >
          <option value="">Select Weekly Off</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-300">
            Upload Shop Image
          </label>

          <input
            type="file"
            onChange={handleImage}
            className="file-input w-full bg-slate-800 text-white border border-white/20"
          />

          {imageFile && (
            <p className="text-sm text-green-400 mt-2">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary md:col-span-2 hover:scale-105 transition duration-300">
          {editData ? "Update Shop" : "Add Shop"}
        </button>

      </form>
    </div>
  </div>
);
};

export default FoodForm;
