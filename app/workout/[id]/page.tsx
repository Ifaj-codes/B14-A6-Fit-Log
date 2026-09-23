import Link from "next/link";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";

export default async function WorkoutDetails({ params }: any) {
  const resolvedParams = await params;
  const currentId = String(resolvedParams.id);

  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store"
  });
  const allLifts = await res.json();
  
  const data = allLifts.find((item: any) => String(item.id) === currentId || String(item._id) === currentId);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#ccff00] font-bold text-xl">
        Loading Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 px-6 md:px-20 pb-20 bg-[#0a0a0a] text-white">
      <Link href="/" className="text-[#ccff00] mb-8 inline-block font-semibold hover:underline">
        ← Back to Library
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        {/* বাম পাশ - ছবি */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden h-[500px] lg:h-[650px] border border-gray-700 relative">
          <img 
            src={data.image} 
            alt={data.workoutName} 
            className="object-cover w-full h-full opacity-90" 
          />
        </div>

        {/* ডান পাশ - ডিটেইলস ও ইনস্ট্রাকশন */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">{data.workoutName}</h1>
          <p className="text-gray-400 text-lg mb-8">
            {data.description || "A compound movement that builds strength, stability, and power across multiple muscle groups."}
          </p>
          
          {/* Stats List (ভিডিওর মতো লম্বালম্বি ডিজাইন) */}
          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 mb-8 flex flex-col gap-4 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Equipment</span>
              <span className="font-semibold">{data.equipment}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Difficulty</span>
              <span className="font-semibold">{data.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Sets</span>
              <span className="font-semibold">{data.sets || "4"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Reps</span>
              <span className="font-semibold">{data.reps || "6-8"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Duration</span>
              <span className="font-semibold">{data.duration} min</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-400 font-bold uppercase">Calories</span>
              <span className="font-semibold">{data.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase">Rating</span>
              <span className="font-semibold">⭐ {data.rating}</span>
            </div>
          </div>

          {/* Instructions (ভিডিওর মতো ১, ২, ৩, ৪ স্টেপ) */}
          <div className="mb-10">
            <h3 className="text-xl font-bold uppercase mb-4">Instructions</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm leading-relaxed">
              {data.instructions ? (
                // API-তে ইনস্ট্রাকশন থাকলে সেটা দেখাবে
                Array.isArray(data.instructions) ? 
                  data.instructions.map((step: string, i: number) => <li key={i}>{step}</li>) 
                  : <li>{data.instructions}</li>
              ) : (
                // API-তে না থাকলে ভিডিওর ডেমো টেক্সট দেখাবে
                <>
                  <li>Lie on the bench with eyes under the bar and feet planted.</li>
                  <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                  <li>Press up in a slight arc until elbows lock without bouncing.</li>
                  <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                </>
              )}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AddButton workoutData={data} />
            <SaveButton workoutData={data} />
          </div>

        </div>
      </div>
    </div>
  );
}