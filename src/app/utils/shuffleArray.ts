export default function shuffleStringArray(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5);
}
