"use client";

interface Workout {
  _id?: string;
  id?: string;
  workoutName: string;
  [key: string]: any;
}

export default function SaveButton({ workoutData }: { workoutData: Workout }) {
  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("savedFitPlans") || "[]");
    
    const currentId = String(workoutData._id || workoutData.id);
    const isAlreadyAdded = existing.find((item: Workout) => String(item._id || item.id) === currentId);
    
    if (isAlreadyAdded) {
      alert("Already in your saved list!");
    } else {
      existing.push(workoutData);
      localStorage.setItem("savedFitPlans", JSON.stringify(existing));
      window.dispatchEvent(new Event("savedUpdated"));
      alert("Saved for later!");
    }
  };

  return (
    <button 
      onClick={handleSave}
      className="border border-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 flex-1 text-center transition text-sm"
    >
      Save for later
    </button>
  );
}