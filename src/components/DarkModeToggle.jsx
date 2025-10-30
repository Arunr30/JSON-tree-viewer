import React from "react";

export default function DarkModeToggle({ isDark, setIsDark }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Dark/Light
      </span>
      <button
        onClick={() => setIsDark(!isDark)}
        className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors duration-300 ${
          isDark ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
