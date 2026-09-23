"use client";

export default function MyButton() {
  return (
    <button 
      onClick={() => alert("ভাই, আমি ওয়াদা করছি ১৮0 দিন পর আমি উইনার হবো!")}
      style={{ padding: "10px 20px", background: "blue", color: "white", marginTop: "20px" }}
    >
      আমাকে ক্লিক করো
    </button>
  );
}