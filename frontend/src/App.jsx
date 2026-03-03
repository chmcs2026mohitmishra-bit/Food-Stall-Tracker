import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import StallDetail from "./pages/StallDetail";
import Navbar from "./components/Navbar";
import EditPage from "./pages/EditPage";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200">
        
        {/* Toast Container */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              zIndex: 9999,
              borderRadius:"12px",
              padding:"16px",
            },
          }}
        />

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/stall/:id" element={<StallDetail />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
