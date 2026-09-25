import Link from "next/link";

export default function Footer() {
  return (
    <div className="py-8 px-5 border-t border-[#1a1a1a] bg-[#0a0a0a] mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3 md:mb-0">
          {/* biceps er theke dumbbell tai valo manay ekhane */}
          {/* <img src="/biceps.png" alt="logo" className="h-6 w-6" /> */}
          <img src="/logo.png" alt="logo" className="h-6 w-6" />
          <span className="tracking-widest uppercase">Fitlog</span>
        </Link>
        
        <div className="text-sm text-gray-500">
          © 2026 FitLog 
        </div>
        
      </div>
    </div>
  );
}