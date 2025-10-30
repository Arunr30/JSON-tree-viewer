import React from "react";

export default function JsonInput({ value, onChange }) {
  return (
    <textarea
      className="w-full h-[400px] p-4 border rounded-lg font-mono text-sm 
                 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
