export function valueToColor(value, min, max) {
  const ratio = (value - min) / (max - min);
  const r = Math.floor(255 * (1 - ratio));
  const g = Math.floor(255 * ratio);
  return `rgb(${r},${g},0)`; // red → green gradient
}
