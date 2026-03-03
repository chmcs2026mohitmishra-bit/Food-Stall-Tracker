import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const StallDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stall, setStall] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStall = async () => {
    try {
      const res = await api.get(`/stalls`);
      const shop = res.data.find((s) => s._id === id);
      if (!shop) {
        toast.error("Shop not found");
        navigate("/");
        return;
      }
      setStall(shop);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load shop data");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchStall();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!stall) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-10 text-gray-200">
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">

        {/* Shop Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">

          {stall.image && (
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={stall.image}
                alt={stall.shopname}
                className="w-56 h-56 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          )}

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-primary mb-2">
              {stall.shopname}
            </h2>

            <p className="text-gray-400">{stall.ownername}</p>
            <p className="text-gray-400">{stall.address}</p>
            <p className="text-gray-400">📞 {stall.contactno}</p>

            {/* Rating */}
            <div className="mt-3">
              <span className="text-yellow-400 text-lg">
                {"★".repeat(stall.rating)}{" "}
                {"☆".repeat(5 - stall.rating)}
              </span>
            </div>

            {/* Timing Section */}
            <div className="flex flex-wrap gap-3 mt-4 text-sm">

              <div className="bg-green-500/20 border border-green-500 text-green-400 px-3 py-1 rounded-full">
                🕒 Open: {stall.openingTime || "N/A"}
              </div>

              <div className="bg-blue-500/20 border border-blue-500 text-blue-400 px-3 py-1 rounded-full">
                🔒 Close: {stall.closingTime || "N/A"}
              </div>

              <div className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 rounded-full">
                ❌ Weekly Off: {stall.weeklyOff || "None"}
              </div>

            </div>

          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Description
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {stall.description || "No description available"}
          </p>
        </div>

        {/* Foods List */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">
            🍽 Available Foods
          </h3>

          {stall.foods && stall.foods.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {stall.foods.map((food, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl flex justify-between items-center hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition"
                >
                  <span className="font-medium text-gray-200">
                    {food.foodname}
                  </span>
                  <span className="text-green-400 font-semibold">
                    ₹ {food.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No foods added yet</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default StallDetail;