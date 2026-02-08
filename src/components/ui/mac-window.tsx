"use client";

export const MacWindow = () => {
  return (
    <div className="bg-gray-800 rounded-t-xl p-2 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity" />
      </div>
    </div>
  );
};
