import Link from "next/link";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";

export default async function WorkoutDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let data = null;

  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "no-store" });
    const allData = await res.json();
    
    // String e convert kore strictly match kora hocche
    data = allData.find((item: any) => 
      String(item._id) === String(id) || String(item.id) === String(id)
    );
  } catch (error) {
    // silently fail
  }
  
  // যদি ডাটা না পায়, তাহলে এই স্ক্রিনটা দেখাবে আইডি সহ
  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h2 className="text-[#ccff00] font-bold text-2xl mb-2">Data Not Found!</h2>
        <p className="text-gray-400">Received ID from URL: <span className="text-red-500 bg-gray-900 px-2 py-1 rounded">{id}</span></p>
        <p className="text-gray-500 text-sm mt-4">Please go to Home, HARD REFRESH, and try again.</p>
        <Link href="/" className="mt-6 bg-[#ccff00] text-black px-6 py-2 font-bold rounded">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 px-5 md:px-12 pb-20">
      <Link href="/" className="text-[#ccff00] mb-5 inline-block font-medium hover:underline">
        Back to Library
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        
        <div className="bg-[#111] rounded-lg overflow-hidden h-[450px] lg:h-[550px] border border-[#222]">
          <img 
            src={data.image} 
            alt={data.workoutName} 
            className="object-cover w-full h-full" 
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold uppercase mb-2">{data.workoutName}</h1>
          <p className="text-gray-400 text-base mb-6">
            {data.description}
          </p>
          
          <div className="bg-[#111111] p-4 rounded border border-gray-800 mb-6 flex flex-col gap-3 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Equipment</span>
              <span className="font-semibold">{data.equipment}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Difficulty</span>
              <span className="font-semibold">{data.difficulty}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Sets</span>
              <span className="font-semibold">{data.sets}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Reps</span>
              <span className="font-semibold">{data.reps}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Duration</span>
              <span className="font-semibold">{data.duration} min</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 uppercase">Calories</span>
              <span className="font-semibold">{data.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 uppercase">Rating</span>
              <span className="font-semibold">⭐ {data.rating}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase mb-3">Instructions</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm">
              {data.instructions?.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <AddButton workoutData={data} />
            <SaveButton workoutData={data} />
          </div>

        </div>
      </div>
    </div>
  );
}