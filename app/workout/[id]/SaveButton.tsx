"use client";

export default function SaveButton({ workoutData }: any) {
  const handleSave = () => {
    // Saved ডাটা রাখার জন্য আলাদা স্টোরেজ "savedFitPlans" বানালাম
    const existing = JSON.parse(localStorage.getItem("savedFitPlans") || "[]");
    const isAlreadyAdded = existing.find((item: any) => String(item.id || item._id) === String(workoutData.id || workoutData._id));

    if (isAlreadyAdded) {
      alert("Already saved for later! 🔖");
    } else {
      existing.push(workoutData);
      localStorage.setItem("savedFitPlans", JSON.stringify(existing));
      window.dispatchEvent(new Event("savedUpdated")); // Navbar-কে সিগন্যাল
      alert("Saved for later! 🔖");
    }
  };

  return (
    <button 
      onClick={handleSave}
      className="border-2 border-gray-600 font-bold py-4 px-6 rounded-md hover:bg-white hover:text-black transition flex-1 text-center"
    >
      🔖 Save for later
    </button>
  );
}