import { RequestTypes } from './enums';
import type {
  ActiveUsersResponse,
  LoginRequest,
  LoginResponse,
  LoginStatusPayload,
  LogoutResponse,
  Payloads,
  UserCredentials,
  UserCredentialsPayload,
  UsersPayload,
  UserStatus,
  WSRequest,
} from './types';

function isUserStatus(user: object): user is UserStatus {
  if (
    typeof (user as UserStatus).login === 'string' &&
    typeof (user as UserStatus).isLogined === 'boolean'
  ) {
    return true;
  }

  return false;
}

function isUserCredentials(user: unknown): user is UserCredentials {
  if (
    typeof (user as UserCredentials).login === 'string' &&
    typeof (user as UserCredentials).password === 'string'
  ) {
    return true;
  }

  return false;
}

function isLoginStatusPayload(
  payload: Payloads,
): payload is LoginStatusPayload {
  if (
    (payload as LoginStatusPayload).user &&
    isUserStatus((payload as LoginStatusPayload).user)
  ) {
    return true;
  }

  return false;
}

function isUserCredentialsPayload(
  payload: Payloads,
): payload is UserCredentialsPayload {
  if (
    (payload as UserCredentialsPayload).user &&
    isUserCredentials((payload as UserCredentialsPayload).user)
  ) {
    return true;
  }

  return false;
}

function isLoginRequest(
  message: WSRequest<RequestTypes, Payloads>,
): message is LoginRequest {
  if (
    typeof message.id === 'string' &&
    message.type === RequestTypes.UserLogin &&
    message.payload
  ) {
    const { payload } = message;

    if (isUserCredentialsPayload(payload)) return true;
  }

  return false;
}

function isLoginResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is LoginResponse {
  if (
    typeof message.id === 'string' &&
    message.type === RequestTypes.UserLogin &&
    message.payload
  ) {
    const { payload } = message;

    if (isLoginStatusPayload(payload)) return true;
  }

  return false;
}

function isLogoutResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is LogoutResponse {
  if (message.type === RequestTypes.UserLogout && message.payload) {
    const { payload } = message;

    if (isLoginStatusPayload(payload)) return true;
  }

  return false;
}

function isUsersPayload(payload: Payloads): payload is UsersPayload {
  if ((payload as UsersPayload).users) {
    if (!(payload as UsersPayload).users.length) {
      return true;
    }

    if ((payload as UsersPayload).users.every(isUserStatus)) {
      return true;
    }
  }

  return false;
}

function isActiveUsersResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is ActiveUsersResponse {
  if (message.type === RequestTypes.UsersActive && message.payload) {
    const { payload } = message;

    if (isUsersPayload(payload)) return true;
  }

  return false;
}

export {
  isUserCredentials,
  isLoginRequest,
  isLoginResponse,
  isLogoutResponse,
  isActiveUsersResponse,
};
