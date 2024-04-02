export type InputTypes =
  | 'number'
  | 'search'
  | 'button'
  | 'time'
  | 'image'
  | 'text'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'month'
  | 'password'
  | 'radio'
  | 'range';

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type EmptyCar = Record<string, never>;

export type Cars = Car[];

export type EngineParameters = {
  velocity: number;
  distance: number;
};

export type EngineDriveStatus = {
  success: boolean;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = Winner[];
