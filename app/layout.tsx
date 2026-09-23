"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const myPlans = JSON.parse(localStorage.getItem("myFitPlans") || "[]");
      const saved = JSON.parse(localStorage.getItem("savedFitPlans") || "[]");
      setPlanCount(myPlans.length);
      setSavedCount(saved.length);
    };

    updateCounts();
    window.addEventListener("planUpdated", updateCounts);
    window.addEventListener("savedUpdated", updateCounts);

    return () => {
      window.removeEventListener("planUpdated", updateCounts);
      window.removeEventListener("savedUpdated", updateCounts);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        
        {/* Navbar */}
        <nav className="flex flex-wrap justify-between items-center p-4 md:px-12 border-b border-gray-800 bg-[#0a0a0a] sticky top-0 z-50">
          
          {/* Logo with image */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider">
            <img src="/logo.png" alt="FitLog Logo" className="h-8 w-8 object-contain" />
            <span>FITLOG</span>
          </Link>

          {/* Nav Links */}
          <div className="flex gap-8 font-semibold text-gray-300">
            <Link href="/" className="hover:text-[#ccff00] transition">Workouts</Link>
            <Link href="/my-plan" className="hover:text-[#ccff00] transition">My Plan</Link>
          </div>

          {/* Plan and Saved Badges */}
          <div className="flex items-center gap-4">
            <Link href="/my-plan" className="bg-[#ccff00] text-black px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#b3e600] transition">
              Plan <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded-full text-xs">{planCount}</span>
            </Link>
            
            <Link href="/my-plan" className="border border-gray-700 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 hover:border-[#ccff00] transition">
              Saved <span className="bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs">{savedCount}</span>
            </Link>
          </div>

        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm bg-[#0a0a0a]">
           <span className="font-bold text-white mr-2">💪 FITLOG</span> © 2026 FitLog — Workout Library. Train hard, log honest.
        </footer>

      </body>
    </html>
  );
}