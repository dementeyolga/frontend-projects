import {
  ClientErrorResponses,
  HTTPMethods,
  ServerErrorResponses,
  SuccesfulResponses,
} from '../types/enums';
import {
  Car,
  Cars,
  EmptyCar,
  EngineDriveStatus,
  EngineParameters,
  Winner,
} from '../types/types';

export async function getCars(): Promise<Cars | null> {
  try {
    const resp = await fetch('http://localhost:3000/garage/');
    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured`);
    return null;
  }
}

export async function getCar(id: number): Promise<Car | EmptyCar | null> {
  try {
    const resp = await fetch(`http://localhost:3000/garage/${id}`);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured`);
    return null;
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
    console.error(`An error occured ${err}`);
  }
}

export async function deleteCar(id: number): Promise<void> {
  try {
    await fetch(`http://localhost:3000/garage/${id}`, {
      method: HTTPMethods.DELETE,
    });
  } catch (err) {
    console.error(`An error occured ${err}`);
  }
}

export async function updateCar(
  id: number,
  name: string,
  color: string,
): Promise<Car | null> {
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
    console.error(`An error occured ${err}`);
    return null;
  }
}

export async function setCarEngineStatus(
  id: number,
  engineStatus: 'started' | 'stopped',
): Promise<EngineParameters | null> {
  try {
    const resp = await fetch(
      `http://localhost:3000/engine?id=${id}&status=${engineStatus}`,
      {
        method: HTTPMethods.PATCH,
      },
    );

    const { status } = resp;

    if (status === ClientErrorResponses.BadRequest) {
      console.error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
      );
    } else if (status === ClientErrorResponses.NotFound) {
      console.error('Car with such id was not found in the garage.');
    } else if (status === SuccesfulResponses.OK) {
      const data = await resp.json();

      return data;
    }

    return null;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
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

    const { status } = resp;

    if (status === ClientErrorResponses.BadRequest) {
      console.error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
      );
    } else if (status === ClientErrorResponses.NotFound) {
      console.error(
        'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
      );
    } else if (status === ClientErrorResponses.TooManyRequests) {
      console.error(
        `Drive already in progress. You can't run drive for the same car twice while it's not stopped.`,
      );
    } else if (status === ServerErrorResponses.InternalError) {
      console.error(
        `Car has been stopped suddenly. It's engine was broken down.`,
      );
    } else if (status === SuccesfulResponses.OK) {
      const data = await resp.json();

      return data;
    }

    return null;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
  }
}

export async function getWinners(
  page?: number,
  limit?: number,
  sort?: 'id' | 'wins' | 'time',
  order?: 'ASC' | 'DESC',
): Promise<Cars | null> {
  try {
    let url = 'http://localhost:3000/winners';

    if (arguments.length) {
      url += '?';

      const params: string[] = [];

      if (page) {
        params.push(`_page=${page}`);
      }

      if (limit) {
        params.push(`_limit=${limit}`);
      }

      if (sort) {
        params.push(`_sort=${sort}`);
      }

      if (order) {
        params.push(`_order=${order}`);
      }

      url += params.join('&');
    }

    const resp = await fetch(url);

    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getWinner(id: number): Promise<Car | EmptyCar | null> {
  try {
    const resp = await fetch(`http://localhost:3000/winners/${id}`);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured`);
    return null;
  }
}

export async function createWinner(winner: Winner): Promise<void> {
  try {
    const resp = await fetch('http://localhost:3000/winners', {
      method: HTTPMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    const { status } = resp;

    if (status === SuccesfulResponses.Created) {
      console.log('Winner successfully created');
    } else if (status === ServerErrorResponses.InternalError) {
      console.error('Error: Insert failed, duplicate id');
    }
  } catch (err) {
    console.error(`An error occured ${err}`);
  }
}

export async function deleteWinner(id: number): Promise<void> {
  try {
    await fetch(`http://localhost:3000/winners/${id}`, {
      method: HTTPMethods.DELETE,
    });
  } catch (err) {
    console.error(`An error occured ${err}`);
  }
}

export async function updateWinner(
  id: number,
  wins: number,
  time: number,
): Promise<Winner | EmptyCar | null> {
  try {
    const resp = await fetch(`http://localhost:3000/garage/${id}`, {
      method: HTTPMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
  }
}
