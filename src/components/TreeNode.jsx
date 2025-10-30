import React from "react";

export default function TreeNode({ data }) {
  const { label, type } = data;
  const colors = {
    object: "bg-blue-400 dark:bg-blue-700",
    array: "bg-teal-400 dark:bg-teal-700",
    value: "bg-amber-400 dark:bg-amber-600",
  };

  return (
    <div
      className={`px-3 py-1 rounded-md text-center text-white text-sm shadow-md ${
        colors[type] || "bg-gray-400"
      }`}
    >
      {label}
    </div>
  );
}
