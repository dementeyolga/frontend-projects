export const enum Path {
  Garage = '',
  Winners = 'winners',
}

export const enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const enum SuccesfulResponses {
  OK = 200,
  Created = 201,
}

export const enum ClientErrorResponses {
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
}

export const enum ServerErrorResponses {
  InternalError = 500,
}

export const enum CustomEvents {
  CreateCar = 'create-car',
  UpdateCar = 'update-car',
  DeleteCar = 'delete-car',
  TriggerDeleteCar = 'trigger-delete-car',
  TriggerUpdateCarInfo = 'trigger-update-car-info',
  FocusUpdateCarInput = 'focus-update-car-input',
  StartCar = 'start-car',
  StopCar = 'stop-car',
  StartRace = 'start-race',
  StopRace = 'stop-race',
  NextPage = 'next-page',
  PrevPage = 'prev=page',
  UpdatePaginationState = 'update-pagination-state',
}
