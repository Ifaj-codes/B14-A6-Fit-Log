"use client";

interface Workout {
  _id?: string;
  id?: string;
  workoutName: string;
  [key: string]: any;
}

export default function AddButton({ workoutData }: { workoutData: Workout }) {
  const handleAddPlan = () => {
    const existing = JSON.parse(localStorage.getItem("myFitPlans") || "[]");
    
    // একদম সেফ আইডি ম্যাচিং
    const currentId = String(workoutData._id || workoutData.id);
    const isAlreadyAdded = existing.find((item: Workout) => String(item._id || item.id) === currentId);
    
    if (isAlreadyAdded) {
      alert("Already in your plan!");
    } else {
      existing.push(workoutData);
      localStorage.setItem("myFitPlans", JSON.stringify(existing));
      window.dispatchEvent(new Event("planUpdated"));
      alert("Added to today's plan!");
    }
  };

  return (
    <button 
      onClick={handleAddPlan}
      className="bg-[#ccff00] text-black font-bold py-3 px-6 rounded-full hover:bg-[#b3e600] flex-1 text-center transition text-sm"
    >
      Add to today's plan
    </button>
  );
}