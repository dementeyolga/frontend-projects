import { HTTPMethods } from '../types/enums';
import { Car, Cars, EngineParameters } from '../types/types';

export async function getCars(): Promise<Cars> {
  try {
    const resp = await fetch('http://localhost:3000/garage/');
    const data = await resp.json();

    return data;
  } catch (err) {
    throw new Error(`An error occured`);
  }
}

export async function getCar(id: number): Promise<Car> {
  try {
    const resp = await fetch(`http://localhost:3000/garage/${id}`);
    const data = await resp.json();

    return data;
  } catch (err) {
    throw new Error(`An error occured`);
  }
}

export async function createCar(car: Car): Promise<void> {
  try {
    await fetch('http://localhost:3000/garage', {
      method: HTTPMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}

export async function deleteCar(id: number): Promise<void> {
  try {
    await fetch(`http://localhost:3000/garage/${id}`, {
      method: HTTPMethods.DELETE,
    });
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}

export async function updateCar(id: number, name: string, color: string) {
  try {
    const resp = await fetch(`http://localhost:3000/garage/${id}`, {
      method: HTTPMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}

export async function setCarEngineStatus(
  id: number,
  status: 'started' | 'stopped',
): Promise<EngineParameters> {
  try {
    const resp = await fetch(`http://localhost:3000/engine/${id}/${status}`, {
      method: HTTPMethods.PATCH,
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}
