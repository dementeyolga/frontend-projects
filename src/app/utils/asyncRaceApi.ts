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
  Winners,
} from '../types/types';

export const LIMIT_PER_PAGE = 6;

const BASE_API = `http://127.0.0.1:3000`;

export async function getCars(
  page?: number,
  limit?: number,
): Promise<Cars | null> {
  try {
    let url = `${BASE_API}/garage/`;

    if (arguments.length) {
      url += '?';

      const params: string[] = [];

      if (page) {
        params.push(`_page=${page}`);
      }

      if (limit) {
        params.push(`_limit=${limit}`);
      }

      url += params.join('&');
    }

    const resp = await fetch(url);

    return await resp.json();
  } catch (err) {
    console.error(`An error occured`);
    return null;
  }
}

export async function getCar(id: number): Promise<Car | EmptyCar | null> {
  try {
    const resp = await fetch(`${BASE_API}/garage/${id}`);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured`);
    return null;
  }
}

export async function createCar(car: Car): Promise<Car | null> {
  try {
    const resp = await fetch(`${BASE_API}/garage`, {
      method: HTTPMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    const { status } = resp;

    if (status === SuccesfulResponses.Created) {
      return await resp.json();
    }

    return null;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
  }
}

export async function deleteCar(id: number): Promise<void> {
  try {
    await fetch(`${BASE_API}/garage/${id}`, {
      method: HTTPMethods.DELETE,
    });
  } catch (err) {
    console.error(`An error occured ${err}`);
  }
}

export async function updateCar(car: Car): Promise<Car | null> {
  try {
    const { id, name, color } = car;

    const resp = await fetch(`${BASE_API}/garage/${id}`, {
      method: HTTPMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

    const { status } = resp;

    if (status === SuccesfulResponses.OK) {
      return await resp.json();
    }

    return null;
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
      `${BASE_API}/engine?id=${id}&status=${engineStatus}`,
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
): Promise<EngineDriveStatus> {
  try {
    const resp = await fetch(`${BASE_API}/engine?id=${id}&status=drive`, {
      method: HTTPMethods.PATCH,
    });

    const { status } = resp;

    if (status === SuccesfulResponses.OK) {
      const data = await resp.json();

      return data;
    }

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
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error(`An error occured ${err}`);

    return {
      success: false,
    };
  }
}

export async function getWinners(
  page?: number,
  limit?: number,
  sort?: 'id' | 'wins' | 'time',
  order?: 'ASC' | 'DESC',
): Promise<Winners | null> {
  try {
    let url = `${BASE_API}/winners`;

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

export async function getWinner(id: number): Promise<Winner | EmptyCar | null> {
  try {
    const resp = await fetch(`${BASE_API}/winners/${id}`);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.error(`An error occured`);
    return null;
  }
}

export async function createWinner(winner: Winner): Promise<Winner | null> {
  try {
    const resp = await fetch(`${BASE_API}/winners`, {
      method: HTTPMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    const { status } = resp;

    if (status === SuccesfulResponses.Created) {
      console.log('Winner successfully created');

      return await resp.json();
    }

    if (status === ServerErrorResponses.InternalError) {
      console.error('Error: Insert failed, duplicate id');
    }

    return null;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
  }
}

export async function deleteWinner(id: number): Promise<void> {
  try {
    await fetch(`${BASE_API}/winners/${id}`, {
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
    const resp = await fetch(`${BASE_API}/winners/${id}`, {
      method: HTTPMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });

    const { status } = resp;

    if (status === SuccesfulResponses.OK) {
      return await resp.json();
    }

    return null;
  } catch (err) {
    console.error(`An error occured ${err}`);
    return null;
  }
}
