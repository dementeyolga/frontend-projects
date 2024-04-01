export default function getTranslateX(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}
