const StallNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold">
        😔 No Food Stalls Found
      </h2>
      <p className="text-gray-500 mt-2">
        Please add a new stall.
      </p>
    </div>
  );
};

export default StallNotFound;
