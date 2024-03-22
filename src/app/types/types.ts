export type EventCallbacks<T extends HTMLElement> = {
  [Property in keyof HTMLElementEventMap]?: (this: T, ev: Event) => void;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Cars = Car[];
