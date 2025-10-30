// src/utils/parseJson.js

let globalId = 0;

export function parseJsonToFlow(obj, parentId = null, depth = 0, x = 0, y = 0) {
  const nodes = [];
  const edges = [];

  function traverse(value, key = "root", parentId = null, depth = 0, x = 0, y = 0) {
    const id = `node-${globalId++}`;
    const label =
      typeof value === "object" && value !== null
        ? key
        : `${key}: ${String(value)}`;

    const node = {
      id,
      data: { label },
      position: { x, y },
      style: {
        borderRadius: 8,
        padding: 8,
        border: "1px solid #ccc",
        background:
          typeof value === "object" && value !== null
            ? "#93c5fd" 
            : Array.isArray(value)
            ? "#86efac" 
            : "#facc15", 
      },
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }


    if (typeof value === "object" && value !== null) {
      const entries = Array.isArray(value)
        ? value.map((v, i) => [i, v])
        : Object.entries(value);

      let childX = x - (entries.length * 150) / 2;
      const childY = y + 100;

      for (const [childKey, childVal] of entries) {
        traverse(childVal, childKey, id, depth + 1, childX, childY);
        childX += 150;
      }
    }
  }

  traverse(obj, Object.keys(obj)[0], parentId, depth, x, y);
  return { nodes, edges };
}
