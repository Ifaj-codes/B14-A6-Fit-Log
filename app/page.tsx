import Link from "next/link";

interface Workout {
  _id?: string;
  id?: string;
  workoutName: string;
  category: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
}

async function getGymData() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "no-store" });
  return res.json();
}

export default async function Home(props: { searchParams: Promise<{ sort?: string }> }) {
  const resolvedParams = await props.searchParams;
  const sortQuery = resolvedParams?.sort;

  let allWorkouts = await getGymData();

  if (sortQuery === "duration") {
    allWorkouts.sort((a: Workout, b: Workout) => a.duration - b.duration); 
  } else if (sortQuery === "calories") {
    allWorkouts.sort((a: Workout, b: Workout) => b.calories - a.calories); 
  }

  return (
    <div className="pt-8 pb-12 px-4 max-w-7xl mx-auto md:px-10">
      
      <div className="border-gray-800 border flex flex-col md:flex-row items-center gap-8 mb-14 p-6 md:p-12 bg-[#111111] rounded-2xl">
        <div className="flex-1">
          <p className="font-bold text-sm text-[#ccff00] mb-2 tracking-wider uppercase">WORKOUT LIBRARY</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-5 leading-tight font-[Oswald]">
            TRAIN WITH INTENT. <br /> LOG EVERY SET.
          </h1>
          <p className="max-w-md mb-8 text-gray-400 text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          
          <a href="#library" className="px-6 py-3 inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold rounded-full hover:bg-[#b3e600] transition-colors">
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="mt-6 w-full flex-1 flex justify-center md:mt-0">
          <img src="/banner.png" alt="Hero Banner" className="max-w-md w-full object-contain opacity-95" />
        </div>
      </div>

      <div id="library" className="pt-4">
        <div className="bg-[#121212] p-5 flex flex-col md:flex-row items-center justify-between mb-8 rounded-lg border border-[#222]">
          <div>
            <h2 className="mb-1 text-2xl font-bold uppercase">THE LIBRARY</h2>
            <p className="text-sm text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center mt-4 md:mt-0">
            <span className="text-sm text-gray-400 font-bold tracking-wider mr-1">SORT BY:</span>
            <Link href="/?sort=duration" className={`px-4 py-2 text-sm font-bold rounded-md border transition-all ${sortQuery === 'duration' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'text-gray-300 border-gray-700 hover:border-[#ccff00]'}`}>⏱ Duration</Link>
            <Link href="/?sort=calories" className={`py-2 px-4 text-sm font-bold rounded-md border transition-all ${sortQuery === 'calories' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-gray-700 text-gray-300 hover:border-[#ccff00]'}`}>🔥 Calories</Link>
            {sortQuery && (
              <Link href="/" className="px-4 py-2 text-sm font-bold text-red-500 rounded-md border border-red-500 hover:bg-red-500 hover:text-white transition-all">✖ Clear</Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allWorkouts.map((item: Workout) => {
            const currentId = item._id || item.id;
            return (
              <Link href={`/workout/${currentId}`} key={currentId}>
                <div className="hover:border-[#ccff00] border-gray-800 border p-4 bg-[#111111] rounded-xl transition duration-300">
                  <div className="overflow-hidden w-full h-52 bg-gray-900 rounded-lg mb-4 relative">
                    <img src={item.image} alt={item.workoutName} className="h-full w-full object-cover opacity-80" />
                  </div>
                  <div className="mb-2">
                    <span className="rounded px-2 text-xs py-1 bg-gray-800 text-gray-300 font-bold uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-1">{item.workoutName}</h3>
                  <p className="mb-4 text-gray-400 text-sm">{item.equipment}</p>
                  <div className="pt-3 text-sm flex justify-between font-medium text-gray-300 border-t border-gray-800">
                    <span className={sortQuery === 'duration' ? 'text-[#ccff00]' : ''}>⏱ {item.duration} min</span>
                    <span className={sortQuery === 'calories' ? 'text-[#ccff00]' : ''}>🔥 {item.calories} kcal</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      
    </div>
  );
}