import { useLocation } from "react-router-dom";
import FoodForm from "../components/FoodForm";

const CreatePage = () => {
  const location = useLocation();
  const editData = location.state?.editData || null; // ✅ get editData if navigating from edit button

  return (
    <div className="max-w-4xl mx-auto p-6">
      <FoodForm editData={editData} />
    </div>
  );
};

export default CreatePage;
