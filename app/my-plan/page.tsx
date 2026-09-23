"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyPlanPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today"); // today or saved

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে ডাটা আনছি
    const savedData = JSON.parse(localStorage.getItem("myFitPlans") || "[]");
    setPlans(savedData);
    setLoading(false);
  }, []);

  // রিমুভ করার ফাংশন (Challenge C3)
  const handleRemove = (id: any) => {
    const updatedPlans = plans.filter((item) => String(item.id || item._id) !== String(id));
    setPlans(updatedPlans);
    localStorage.setItem("myFitPlans", JSON.stringify(updatedPlans));
    window.dispatchEvent(new Event("planUpdated")); // Navbar আপডেট করার সিগন্যাল
    alert("Removed from plan! ❌");
  };

  // ডান করার ফাংশন (Challenge C3)
  const handleMarkDone = () => {
    alert("Marked as Done! ✅ Great job!");
  };

  // উপরের স্ট্যাটস ক্যালকুলেশন
  const totalMins = plans.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const totalKcal = plans.reduce((sum, item) => sum + Number(item.calories || 0), 0);

  if (loading) {
    return <div className="min-h-screen pt-20 text-center text-[#ccff00] font-bold text-xl bg-[#0a0a0a]">Loading workouts...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-10 px-4 md:px-12 pb-20">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">MY PLAN</h1>
        <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-center">
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-500 text-xs font-bold mb-1">EXERCISES</p>
          <p className="text-2xl font-bold text-[#ccff00]">{plans.length}/5</p>
        </div>
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-500 text-xs font-bold mb-1">MINUTES</p>
          <p className="text-2xl font-bold text-white">{totalMins}</p>
        </div>
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-500 text-xs font-bold mb-1">CALORIES</p>
          <p className="text-2xl font-bold text-white">{totalKcal}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 border-b border-gray-800 pb-4 max-w-4xl mx-auto mb-8">
        <button 
          onClick={() => setActiveTab("today")}
          className={`font-bold transition ${activeTab === "today" ? "text-[#ccff00] border-b-2 border-[#ccff00] pb-1" : "text-gray-500"}`}
        >
          Today's Plan
        </button>
        <button 
          onClick={() => setActiveTab("saved")}
          className={`font-bold transition ${activeTab === "saved" ? "text-white border-b-2 border-white pb-1" : "text-gray-500"}`}
        >
          Saved
        </button>
      </div>

      {/* Workout List or Empty State */}
      <div className="max-w-4xl mx-auto">
        {plans.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-2">NOTHING HERE YET</h3>
            <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="bg-[#ccff00] text-black font-bold py-3 px-6 rounded hover:bg-[#b3e600] transition">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {plans.map((item: any, index: number) => (
              <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-[#111111] p-4 rounded-xl border border-gray-800 gap-4">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden shrink-0">
                    <img src={item.image} alt={item.workoutName} className="object-cover w-full h-full opacity-80" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">{item.workoutName}</h3>
                    <p className="text-sm text-gray-400">{item.equipment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                  <span>⏱ {item.duration} min</span>
                  <span>🔥 {item.calories} kcal</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Link href={`/workout/${item.id || item._id}`} className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-700 transition">
                    View
                  </Link>
                  <button onClick={handleMarkDone} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-500 transition">
                    ✓ Done
                  </button>
                  <button onClick={() => handleRemove(item.id || item._id)} className="bg-red-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-red-500 transition">
                    X
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}