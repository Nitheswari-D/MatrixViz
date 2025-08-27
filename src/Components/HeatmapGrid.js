import { useEffect, useRef } from "react";
import { valueToColor } from "../utils/colorUtils";

export default function HeatmapGrid({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const rows = data.length;
    const cols = data[0].length;
    const cellSize = 50;
    const labelOffset = 30; // space for row labels

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Adjust canvas size to include row/column labels
    canvas.width = cols * cellSize + labelOffset;
    canvas.height = rows * cellSize + labelOffset;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const flat = data.flat();
    const min = Math.min(...flat);
    const max = Math.max(...flat);

    // Generate column labels (A, B, C, ...)
    const colLabels = Array.from({ length: cols }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    // Generate row labels (1, 2, 3, ...)
    const rowLabels = Array.from({ length: rows }, (_, i) => i + 1);

    // Draw the cells
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Cell background color
        ctx.fillStyle = valueToColor(data[i][j], min, max);
        ctx.fillRect(labelOffset + j * cellSize, i * cellSize, cellSize, cellSize);

        // Cell value
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          data[i][j],
          labelOffset + j * cellSize + cellSize / 2,
          i * cellSize + cellSize / 2
        );

        // Cell border
        ctx.strokeStyle = "black";
        ctx.strokeRect(labelOffset + j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }

    // Draw row labels (no border)
    rowLabels.forEach((label, i) => {
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(label, labelOffset - 5, i * cellSize + cellSize / 2);
    });

    // Draw column labels at bottom (no border, no hyphen)
    colLabels.forEach((label, i) => {
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        label,
        labelOffset + i * cellSize + cellSize / 2,
        rows * cellSize + labelOffset / 2
      );
    });
  }, [data]);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
}
