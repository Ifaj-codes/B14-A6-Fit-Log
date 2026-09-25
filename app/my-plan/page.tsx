"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyPlanPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today"); 
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const p = localStorage.getItem("myFitPlans");
    const s = localStorage.getItem("savedFitPlans");
    
    if (p) setPlans(JSON.parse(p));
    if (s) setSavedItems(JSON.parse(s));
    
    setLoading(false);

    const updateData = () => {
      const newP = localStorage.getItem("myFitPlans");
      const newS = localStorage.getItem("savedFitPlans");
      if (newP) setPlans(JSON.parse(newP));
      if (newS) setSavedItems(JSON.parse(newS));
    };

    window.addEventListener("planUpdated", updateData);
    window.addEventListener("savedUpdated", updateData);
    
    return () => {
      window.removeEventListener("planUpdated", updateData);
      window.removeEventListener("savedUpdated", updateData);
    };
  }, []);

  const handleRemove = (id: any, fallbackIndex: number) => {
    if (activeTab === "today") {
      const filtered = plans.filter((x, idx) => {
        if (id) return x._id !== id && x.id !== id;
        return idx !== fallbackIndex;
      });
      setPlans(filtered);
      localStorage.setItem("myFitPlans", JSON.stringify(filtered));
      window.dispatchEvent(new Event("planUpdated"));
    } else {
      const filtered = savedItems.filter((x, idx) => {
        if (id) return x._id !== id && x.id !== id;
        return idx !== fallbackIndex;
      });
      setSavedItems(filtered);
      localStorage.setItem("savedFitPlans", JSON.stringify(filtered));
      window.dispatchEvent(new Event("savedUpdated"));
    }
  };

  const getCal = (item: any) => {
    if (!item) return 0;
    const raw = item.calories ?? item.calorie ?? item.caloriesBurned ?? item.kcal ?? item.energy ?? 0;
    const match = String(raw).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getDur = (item: any) => {
    if (!item) return 0;
    const raw = item.duration ?? item.time ?? item.minutes ?? 0;
    const match = String(raw).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const displayData = activeTab === "today" ? plans : savedItems;

  let sortedData = [...displayData];
  if (sortBy === "calories") {
    sortedData.sort((a, b) => getCal(b) - getCal(a));
  } else {
    sortedData.sort((a, b) => getDur(a) - getDur(b));
  }

  let totalMins = 0;
  let totalKcal = 0;
  
  for (let i = 0; i < displayData.length; i++) {
    totalMins += getDur(displayData[i]);
    totalKcal += getCal(displayData[i]);
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] pt-20 text-center text-[#ccff00] font-bold text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-10 px-5 md:px-12 pb-20">
      
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">MY PLAN</h1>
        <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="bg-[#111111] border border-gray-800 rounded-2xl flex flex-row items-center justify-between max-w-4xl mx-auto mb-10 py-6 px-6">
        <div className="flex-1 border-r border-gray-800">
          <p className="text-gray-500 text-xs md:text-sm font-bold mb-1">Exercises</p>
          <p className="text-3xl md:text-4xl font-bold text-[#ccff00]">{displayData.length}</p>
        </div>
        <div className="flex-1 pl-6 md:pl-10 border-r border-gray-800">
          <p className="text-gray-500 text-xs md:text-sm font-bold mb-1">Minutes</p>
          <p className="text-3xl md:text-4xl font-bold text-white">{totalMins}</p>
        </div>
        <div className="flex-1 pl-6 md:pl-10">
          <p className="text-gray-500 text-xs md:text-sm font-bold mb-1">Calories</p>
          <p className="text-3xl md:text-4xl font-bold text-white">{totalKcal}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-4 max-w-4xl mx-auto mb-8 gap-4">
        <div className="flex gap-2 bg-[#111] p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab("today")}
            className={`font-bold px-4 py-2 rounded-md transition text-sm ${activeTab === "today" ? "bg-gray-800 text-[#ccff00]" : "text-gray-500 hover:text-white"}`}
          >
            Today's Plan
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`font-bold px-4 py-2 rounded-md transition text-sm ${activeTab === "saved" ? "bg-gray-800 text-white" : "text-gray-500 hover:text-white"}`}
          >
            Saved
          </button>
        </div>
        
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs font-bold mb-1">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111] border border-gray-700 text-white text-sm px-3 py-1.5 rounded outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {sortedData.length === 0 ? (
          <div className="text-center py-16 bg-[#111111] rounded-2xl border border-gray-800">
            <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">NOTHING HERE YET</h3>
            <p className="text-gray-400 mb-6 text-sm">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="bg-[#ccff00] text-black font-bold py-2.5 px-6 rounded-full hover:bg-[#b3e600] transition text-sm">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedData.map((item: any, index: number) => {
              const name = item.workoutName || item.title || item.name || "Workout";
              const m = getDur(item);
              const c = getCal(item);
              
              return (
                <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-[#111111] p-4 rounded-xl border border-gray-800 gap-4">
                  
                  <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                    <div className="h-16 w-24 bg-gray-900 rounded-lg overflow-hidden shrink-0">
                      {item.image && <img src={item.image} alt={name} className="object-cover w-full h-full opacity-90" />}
                    </div>
                    <div>
                      <h3 className="font-bold uppercase text-base md:text-lg leading-tight mb-1">{name}</h3>
                      <p className="text-xs text-gray-400 mb-1">{item.equipment || "Equipment"}</p>
                      <div className="text-xs text-gray-400 font-medium flex gap-3">
                        <span className="text-[#ccff00]">⏱ {m} min</span>
                        <span>🔥 {c} kcal</span>
                        {item.rating && <span>⭐ {item.rating}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                    <Link href={`/workout/${item._id || item.id}`} className="border border-gray-600 text-gray-300 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-800 transition">
                      View Details
                    </Link>
                    <button onClick={() => alert("Marked as Done! ✅")} className="bg-[#ccff00] text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#b3e600] transition flex items-center gap-1">
                      ✓ Mark as Done
                    </button>
                    <button onClick={() => handleRemove(item._id || item.id, index)} className="text-gray-500 hover:text-red-500 px-2 py-1 transition text-lg font-bold">
                      ×
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  );
}