// 📄 src/pages/Home.jsx
import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { parseJsonToFlow } from "../utils/parseJson";

export default function Home() {
  const [jsonInput, setJsonInput] = useState(`{
    "user": {
      "id": 101,
      "name": "John Doe",
      "email": "john@example.com",
      "address": {
        "city": "New York",
        "country": "USA",
        "zipcode": 10001
      }
    },
    "orders": [
      { "id": 1, "item": "Laptop", "price": 1200 },
      { "id": 2, "item": "Headphones", "price": 200 }
    ]
  }`);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGenerate = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const { nodes: n, edges: e } = parseJsonToFlow(jsonData);
      setNodes(n);
      setEdges(e);
    } catch (err) {
      alert(" Invalid JSON");
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    const query = searchQuery.toLowerCase();
    const matched = nodes.find((n) =>
      n.data.label.toLowerCase().includes(query)
    );
    if (matched) alert(` Found: ${matched.data.label}`);
    else alert(" Not found");
  };


  const styledEdges = edges.map((edge) => ({
    ...edge,
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#3b82f6",
      strokeWidth: 2.5,
    },
  }));

  return (
    <div
      style={{
        background: darkMode ? "#111827" : "#f9fafb",
        color: darkMode ? "#f3f4f6" : "#111827",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <h2
        style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        JSON Tree Visualizer
      </h2>
      <div style={{ marginTop: "1rem", textAlign: "right" }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{ marginRight: "6px" }}
          />
          Dark/Light
        </label>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        {/* Left Panel */}
        <div style={{ width: "40%" }}>
          <input
            type="text"
            placeholder="$.user.address.city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "70%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              marginLeft: "8px",
            }}
          >
            Search
          </button>

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={20}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "14px",
              background: darkMode ? "#1f2937" : "white",
              color: darkMode ? "#f3f4f6" : "#111827",
              marginTop: "0.5rem",
            }}
          />

          <button
            onClick={handleGenerate}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              marginTop: "10px",
              width: "100%",
            }}
          >
            Generate Tree
          </button>
        </div>

        
        <div
          style={{
            flex: 1,
            height: "85vh",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <ReactFlow nodes={nodes} edges={styledEdges} fitView>
            <Background color={darkMode ? "#333" : "#ddd"} gap={16} />
            <MiniMap nodeColor={() => "#facc15"} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
