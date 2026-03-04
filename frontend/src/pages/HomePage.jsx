import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import StallCard from "../components/StallCard";
import StallNotFound from "../components/StallNotFound";

const HomePage = () => {
  const navigate = useNavigate();

  const [stalls, setStalls] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [foodFilter, setFoodFilter] = useState("");
  const [filteredStalls, setFilteredStalls] = useState([]);
  const [editData, setEditData] = useState(null);

  const resetFilters = () => {
    setSearchText("");
    setRatingFilter("");
    setLocationFilter("");
    setFoodFilter("");
    setFilteredStalls(stalls);
  };

  const fetchData = async () => {
    try {
      const res = await api.get("/stalls");
      setStalls(res.data);
      setFilteredStalls(res.data);
    } catch (err) {
      console.log("Failed to fetch stalls:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editData) {
      navigate("/create", { state: { editData } });
    }
  }, [editData, navigate]);

  const applyFilters = () => {
    const filtered = stalls.filter((stall) => {
      const matchesSearch =
        stall.shopname.toLowerCase().includes(searchText.toLowerCase());

      const matchesRating =
        ratingFilter === "" || stall.rating >= Number(ratingFilter);

      const matchesLocation =
        locationFilter === "" ||
        stall.address?.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesFood =
        foodFilter === "" ||
        stall.foods?.some((food) =>
          food.foodname.toLowerCase().includes(foodFilter.toLowerCase())
        );

      return matchesSearch && matchesRating && matchesLocation && matchesFood;
    });

    setFilteredStalls(filtered);
  };

  if (stalls.length === 0) return <StallNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto p-6">

        {/*  Search & Filters Section */}
        <div className="flex flex-wrap gap-3 mb-8 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">

          <input
            type="text"
            placeholder="Search Shop..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            className="select select-bordered bg-white/10 border-white/20 text-white"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Star</option>
            <option value="4">4+ Star</option>
            <option value="3">3+ Star</option>
          </select>

          <input
            type="text"
            placeholder="Search by Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Food"
            value={foodFilter}
            onChange={(e) => setFoodFilter(e.target.value)}
            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-gray-400"
          />

          <button
            className="btn btn-pimary
            transition-all duration-300 
            hover:scale-105 
            hover:brightness-110 
            hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            onClick={applyFilters}
          >
            <FiSearch />
            Apply
          </button>

          <button
            className="btn btn-secondary
            transition-all duration-300 
            hover:scale-105 
            hover:brightness-110 
            hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            onClick={resetFilters}
          >
            Home
          </button>

        </div>

        {/* Stall Cards */}
        {filteredStalls.length === 0 ? (
          <StallNotFound />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredStalls.map((stall) => (
              <StallCard
                key={stall._id}
                item={stall}
                fetchData={fetchData}
                setEditData={setEditData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default HomePage;
