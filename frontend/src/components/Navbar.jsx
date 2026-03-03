import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral text-white shadow-xl border-b border-primary/30 px-8 sticky top-0 z-50">
      
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide 
                     bg-gradient-to-r from-primary to-secondary 
                     bg-clip-text text-transparent 
                     hover:scale-105 transition-all duration-300"
        >
          🍔 Food Stall Tracker
        </Link>
      </div>

      <div>
        <Link
          to="/create"
          className="btn bg-primary text-black border-none 
                     hover:bg-secondary hover:text-black 
                     shadow-lg hover:shadow-primary/50 
                     transition-all duration-300 rounded-xl"
        >
          + Add Stall
        </Link>
      </div>

    </div>
  );
};

export default Navbar;