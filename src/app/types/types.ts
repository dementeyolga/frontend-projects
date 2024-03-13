export type EventCallbacks<T extends HTMLElement> = {
  [Property in keyof HTMLElementEventMap]?: (this: T, ev: Event) => unknown;
};
