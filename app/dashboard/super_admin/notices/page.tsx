"use client";

import { Construction } from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-[40px] p-14 text-center max-w-2xl w-full border border-gray-100">

        {/* Icon */}
        <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center shadow-xl">

          <Construction
            size={80}
            className="text-white"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-800 mt-10">
          Under Development
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-xl mt-5 leading-relaxed">
          This module is currently being developed
          and will be available very soon.
        </p>

        {/* Status Badge */}
        <div className="mt-8 inline-block bg-yellow-100 text-yellow-700 px-6 py-3 rounded-full font-semibold text-lg">
          🚧 Work in Progress
        </div>
      </div>
    </div>
  );
}