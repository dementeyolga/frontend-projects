export type EventCallbacks<T extends HTMLElement> = {
  [Property in keyof HTMLElementEventMap]?: (this: T, ev: Event) => void;
};

export type UserInfo = {
  'First Name': string;
  Surname: string;
};
