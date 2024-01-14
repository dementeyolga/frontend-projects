export function randomInt(min, max) {
  const rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
}
