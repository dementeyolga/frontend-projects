import { RequestTypes } from './enums';
import type {
  ActiveUsersResponse,
  ErrorPayload,
  ErrorResponse,
  ExternalLoginResponse,
  InactiveUsersResponse,
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

function isUserStatus(user: unknown): user is UserStatus {
  if (
    user instanceof Object &&
    typeof (user as UserStatus).login === 'string' &&
    typeof (user as UserStatus).isLogined === 'boolean'
  ) {
    return true;
  }

  return false;
}

function isUserCredentials(user: unknown): user is UserCredentials {
  if (
    user instanceof Object &&
    typeof (user as UserCredentials).login === 'string' &&
    typeof (user as UserCredentials).password === 'string'
  ) {
    return true;
  }

  return false;
}

function isUsersList(users: unknown): users is UserStatus[] {
  if (Array.isArray(users) && (users.length === 0 || users.every(isUserStatus)))
    return true;

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

function isInActiveUsersResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is InactiveUsersResponse {
  if (
    message.type === RequestTypes.UsersInactive &&
    message.payload &&
    isUsersPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isErrorPayload(payload: object): payload is ErrorPayload {
  if (payload && typeof (payload as ErrorPayload).error === 'string')
    return true;

  return false;
}

function isErrorResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is ErrorResponse {
  if (
    message.type === RequestTypes.Error &&
    message.payload &&
    isErrorPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isExternalLoginResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is ExternalLoginResponse {
  if (
    message.type === RequestTypes.UserExternalLogin &&
    isLoginStatusPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isExternalLogoutResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is ExternalLoginResponse {
  if (
    message.type === RequestTypes.UserExternalLogout &&
    isLoginStatusPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

export {
  isUserCredentials,
  isUsersList,
  isLoginRequest,
  isLoginResponse,
  isLogoutResponse,
  isActiveUsersResponse,
  isInActiveUsersResponse,
  isErrorPayload,
  isErrorResponse,
  isExternalLoginResponse,
  isExternalLogoutResponse,
};
