import Link from "next/link";

// API থেকে ডাটা আনার ফাংশন
async function getGymData() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store"
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const sortQuery = resolvedParams?.sort;

  let allWorkouts = await getGymData();

  // সর্টিং লজিক 
  if (sortQuery === "duration") {
    allWorkouts.sort((a: any, b: any) => a.duration - b.duration); 
  } else if (sortQuery === "calories") {
    allWorkouts.sort((a: any, b: any) => b.calories - a.calories); 
  }

  return (
    <div className="pb-12 px-4 md:px-12 max-w-7xl mx-auto pt-10">
      
      {/* 🅱️ Hero / Banner Section */}
      <div className="bg-[#111111] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 mb-16 border border-gray-800">
        
        {/* বাম পাশ - টেক্সট */}
        <div className="flex-1">
          <p className="text-[#ccff00] font-bold tracking-wider mb-2 text-sm uppercase">WORKOUT LIBRARY</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            Train with intent. <br /> Log every set.
          </h1>
          <p className="text-gray-400 mb-8 max-w-md text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          
          <a href="#library" className="bg-[#ccff00] text-black font-bold py-3 px-8 rounded-full hover:bg-[#b3e600] transition inline-flex items-center gap-2">
            Browse Workouts
          </a>
        </div>

        {/* ডান পাশ - ছবি (public ফোল্ডারের banner.png) */}
        <div className="flex-1 flex justify-center w-full">
          <img 
            src="/banner.png" 
            alt="Hero Illustration" 
            className="w-full max-w-md object-contain opacity-90" 
          />
        </div>
      </div>

      {/* ⚖️ The Library Section */}
      <div id="library" className="pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#111111] p-4 rounded-lg border border-gray-800">
          <div>
            <h2 className="text-2xl font-bold uppercase mb-1">The Library</h2>
            <p className="text-gray-400 text-sm">Twelve lifts covering every major muscle group.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <span className="text-gray-400 font-bold text-sm tracking-wider">SORT BY:</span>
            <Link href="/?sort=duration" className={`px-4 py-2 text-sm font-bold rounded-md border transition ${sortQuery === 'duration' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-gray-700 hover:border-[#ccff00] text-gray-300'}`}>⏱ Duration</Link>
            <Link href="/?sort=calories" className={`px-4 py-2 text-sm font-bold rounded-md border transition ${sortQuery === 'calories' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-gray-700 hover:border-[#ccff00] text-gray-300'}`}>🔥 Calories</Link>
            {sortQuery && (
              <Link href="/" className="px-4 py-2 text-sm font-bold rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">✖ Clear</Link>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWorkouts.map((item: any) => (
            <Link href={`/workout/${item.id || item._id}`} key={item._id || item.id}>
              <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 hover:border-[#ccff00] transition duration-300">
                <div className="h-52 w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img src={item.image} alt={item.workoutName} className="object-cover w-full h-full opacity-80" />
                </div>
                <div className="mb-2">
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300 font-bold uppercase">{item.category}</span>
                </div>
                <h3 className="font-bold text-xl uppercase mb-1">{item.workoutName}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.equipment}</p>
                <div className="flex justify-between border-t border-gray-800 pt-3 text-sm text-gray-300 font-medium">
                  <span className={sortQuery === 'duration' ? 'text-[#ccff00]' : ''}>⏱ {item.duration} min</span>
                  <span className={sortQuery === 'calories' ? 'text-[#ccff00]' : ''}>🔥 {item.calories} kcal</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
}