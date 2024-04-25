export default function getOwnTextContent(element: HTMLElement): string {
  const arr = Array.from(element.childNodes);
  const text = arr.reduce(
    (a, b) => a + (b.nodeType === 3 ? b.textContent : ''),
    '',
  );

  return text;
}
