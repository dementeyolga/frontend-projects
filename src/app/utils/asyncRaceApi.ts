import { Car, Cars } from '../types/types';

export async function getCars(): Promise<Cars> {
  const resp = await fetch('http://localhost:3000/garage/');
  const data = await resp.json();

  return data;
}

export async function getCar(id: number): Promise<Car> {
  const resp = await fetch(`http://localhost:3000/garage/${id}`);
  const data = await resp.json();

  return data;
}

export async function createCar(car: Car): Promise<void> {
  const resp = await fetch(`http://localhost:3000/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });

  return resp.json();
}
