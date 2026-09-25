"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const loadCounts = () => {
      const plans = JSON.parse(localStorage.getItem("myFitPlans") || "[]");
      const saved = JSON.parse(localStorage.getItem("savedFitPlans") || "[]");
      setPlanCount(plans.length);
      setSavedCount(saved.length);
    };

    loadCounts();

    window.addEventListener("planUpdated", loadCounts);
    window.addEventListener("savedUpdated", loadCounts);

    return () => {
      window.removeEventListener("planUpdated", loadCounts);
      window.removeEventListener("savedUpdated", loadCounts);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        
        <nav className="border-b border-gray-800 bg-[#0a0a0a] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4 md:px-10 w-full">
            
            <Link href="/" className="flex items-center gap-2 font-black text-lg md:text-xl tracking-widest uppercase">
              <img src="/logo.png" alt="logo" className="h-6 w-6 object-contain" />
              <span>FITLOG</span>
            </Link>

            <div className="flex gap-6 md:gap-8 font-bold text-xs md:text-sm mt-4 md:mt-0">
              <Link href="/" className="text-gray-400 hover:text-white transition">Workouts</Link>
              <Link href="/my-plan" className="text-gray-400 hover:text-white transition">My Plan</Link>
            </div>

            <div className="flex gap-5 md:gap-6 mt-4 md:mt-0">
              <Link href="/my-plan" className="flex items-center gap-2 text-gray-400 font-bold text-xs md:text-sm hover:text-white transition group">
                <span>Plan</span>
                <span className="bg-[#ccff00] text-black rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] md:text-xs font-black transition">{planCount}</span>
              </Link>
              <Link href="/my-plan" className="flex items-center gap-2 text-gray-400 font-bold text-xs md:text-sm hover:text-white transition group">
                <span>Saved</span>
                <span className="border border-gray-600 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] md:text-xs font-black transition">{savedCount}</span>
              </Link>
            </div>

          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}