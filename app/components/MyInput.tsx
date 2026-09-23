"use client";
import { useState } from "react";

export default function MyInput(){
    const [name, setName] = useState("");

    return (
        <div className="flex flex-col items-center mt-10">
            <input
            type="text"
            placeholder="tomar nam lekho"
            onChange={(e) =>setName(e.target.value)}
            className="px-4 py-2 text-black rounded-md mb-4 outline-none border-2 border-blue-500"
            />
            <h2 className="text-2xl font-bold text-green-400">
                hello,{name}!

            </h2>
        </div>
    );
}