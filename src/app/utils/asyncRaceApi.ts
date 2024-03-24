import {
  ClientErrorResponses,
  HTTPMethods,
  ServerErrorResponses,
  SuccesfulResponses,
} from '../types/enums';
import { Car, Cars, EngineDriveStatus, EngineParameters } from '../types/types';

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
): Promise<EngineParameters | null> {
  try {
    const resp = await fetch(
      `http://localhost:3000/engine?id=${id}&status=${status}`,
      {
        method: HTTPMethods.PATCH,
      },
    );

    if (resp.status === ClientErrorResponses.BadRequest) {
      console.error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
      );
    } else if (resp.status === ClientErrorResponses.NotFound) {
      console.error('Car with such id was not found in the garage.');
    } else if (resp.status === SuccesfulResponses.OK) {
      const data = await resp.json();

      return data;
    }

    return null;
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}

export async function setCarEngineToDriveStatus(
  id: number,
): Promise<EngineDriveStatus | null> {
  try {
    const resp = await fetch(
      `http://localhost:3000/engine?id=${id}&status=drive`,
      {
        method: HTTPMethods.PATCH,
      },
    );

    if (resp.status === ClientErrorResponses.BadRequest) {
      console.error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
      );
    } else if (resp.status === ClientErrorResponses.NotFound) {
      console.error(
        'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
      );
    } else if (resp.status === ClientErrorResponses.TooManyRequests) {
      console.error(
        `Drive already in progress. You can't run drive for the same car twice while it's not stopped.`,
      );
    } else if (resp.status === ServerErrorResponses.InternalError) {
      console.error(
        `Car has been stopped suddenly. It's engine was broken down.`,
      );
    } else if (resp.status === SuccesfulResponses.OK) {
      const data = await resp.json();

      return data;
    }

    return null;
  } catch (err) {
    throw new Error(`An error occured ${err}`);
  }
}
