"use client";

export default function AddButton({ workoutData }: any) {
  
  const handleAddPlan = () => {
    // আগের ডাটা বের করা
    const existing = JSON.parse(localStorage.getItem("myFitPlans") || "[]");
    
    // চেক করা যে আগে থেকেই অ্যাড করা আছে কিনা
    const isAlreadyAdded = existing.find((item: any) => item.workoutName === workoutData.workoutName);
    
    if (isAlreadyAdded) {
      alert("Already in your plan! 💪");
    } else {
      // নতুন ডাটা অ্যাড করা
      existing.push(workoutData);
      localStorage.setItem("myFitPlans", JSON.stringify(existing));
      
      // Navbar কে সিগন্যাল পাঠানো
      window.dispatchEvent(new Event("planUpdated"));
      alert("Added to today's plan! 🔥");
    }
  };

  return (
    <button 
      onClick={handleAddPlan}
      className="bg-[#ccff00] text-black font-bold py-4 px-6 rounded-md hover:bg-[#b3e600] flex-1 text-center transition"
    >
      ➕ Add to today's plan
    </button>
  );
}