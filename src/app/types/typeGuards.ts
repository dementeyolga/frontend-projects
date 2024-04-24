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
  Message,
  MessageData,
  MessageDeletePayload,
  MessageDeleteResponse,
  MessageDeliveredPayload,
  MessageDeliveredResponse,
  MessageEditResponse,
  MessageEditResponsePayload,
  MessageHistoryResponse,
  MessageHistoryResponsePayload,
  MessageReadPayload,
  MessageReadResponse,
  MessageStatus,
  Payloads,
  SendMessageResponse,
  SendMessageResponsePayload,
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

function isMessage(message: unknown): message is Message {
  if (
    message instanceof Object &&
    typeof (message as Message).text === 'string' &&
    typeof (message as Message).to === 'string'
  ) {
    return true;
  }

  return false;
}

function isMessageStatus(status: unknown): status is MessageStatus {
  if (
    status instanceof Object &&
    typeof (status as MessageStatus).isDelivered === 'boolean' &&
    typeof (status as MessageStatus).isEdited === 'boolean' &&
    typeof (status as MessageStatus).isReaded === 'boolean'
  ) {
    return true;
  }

  return false;
}

function isMessageData(message: unknown): message is MessageData {
  if (
    isMessage(message) &&
    typeof (message as MessageData).from === 'string' &&
    typeof (message as MessageData).datetime === 'number' &&
    typeof (message as MessageData).id === 'string' &&
    isMessageStatus((message as MessageData).status)
  ) {
    return true;
  }

  return false;
}

function isSendMessageResponsePayload(
  payload: unknown,
): payload is SendMessageResponsePayload {
  if (
    payload instanceof Object &&
    (payload as SendMessageResponsePayload).message &&
    isMessageData((payload as SendMessageResponsePayload).message)
  ) {
    return true;
  }

  return false;
}

function isSendMessageResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is SendMessageResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.SendMessage &&
    isSendMessageResponsePayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isMessagesList(messages: unknown): messages is MessageData[] {
  if (
    Array.isArray(messages) &&
    (messages.length === 0 || messages.every(isMessageData))
  )
    return true;

  return false;
}

function isMessageHistoryResponsePayload(
  payload: unknown,
): payload is MessageHistoryResponsePayload {
  const { messages } = payload as MessageHistoryResponsePayload;

  if (payload instanceof Object && messages && isMessagesList(messages)) {
    return true;
  }

  return false;
}

function isMessageHistoryResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is MessageHistoryResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.MessageHistory &&
    isMessageHistoryResponsePayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isMessageDeliveredPayload(
  payload: unknown,
): payload is MessageDeliveredPayload {
  if (
    payload instanceof Object &&
    (payload as MessageDeliveredPayload).message &&
    (payload as MessageDeliveredPayload).message.id &&
    typeof (payload as MessageDeliveredPayload).message.id === 'string' &&
    (payload as MessageDeliveredPayload).message.status &&
    typeof (payload as MessageDeliveredPayload).message.status.isDelivered ===
      'boolean'
  ) {
    return true;
  }

  return false;
}

function isMessageDeliveredResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is MessageDeliveredResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.MessageDelivered &&
    isMessageDeliveredPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isMessageReadPayload(payload: unknown): payload is MessageReadPayload {
  if (
    payload instanceof Object &&
    (payload as MessageReadPayload).message &&
    typeof (payload as MessageReadPayload).message.id === 'string' &&
    (payload as MessageReadPayload).message.status &&
    typeof (payload as MessageReadPayload).message.status.isReaded === 'boolean'
  ) {
    return true;
  }

  return false;
}

function isMessageReadResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is MessageReadResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.MessageRead &&
    isMessageReadPayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isMessageDeletePayload(
  payload: unknown,
): payload is MessageDeletePayload {
  if (
    payload instanceof Object &&
    (payload as MessageDeletePayload).message &&
    typeof (payload as MessageDeletePayload).message.id === 'string' &&
    (payload as MessageDeletePayload).message.status &&
    typeof (payload as MessageDeletePayload).message.status.isDeleted ===
      'boolean'
  ) {
    return true;
  }

  return false;
}

function isMessageDeleteResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is MessageDeleteResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.DeleteMessage &&
    isMessageDeletePayload(message.payload)
  ) {
    return true;
  }

  return false;
}

function isMessageEditPayload(
  payload: unknown,
): payload is MessageEditResponsePayload {
  if (
    payload instanceof Object &&
    (payload as MessageEditResponsePayload).message &&
    typeof (payload as MessageEditResponsePayload).message.id === 'string' &&
    typeof (payload as MessageEditResponsePayload).message.text === 'string' &&
    (payload as MessageEditResponsePayload).message.status &&
    typeof (payload as MessageEditResponsePayload).message.status.isEdited ===
      'boolean'
  ) {
    return true;
  }

  return false;
}

function isMessageEditResponse(
  message: WSRequest<RequestTypes, Payloads>,
): message is MessageEditResponse {
  if (
    message instanceof Object &&
    message.type === RequestTypes.EditMessage &&
    isMessageEditPayload(message.payload)
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
  isMessage,
  isMessageData,
  isMessageStatus,
  isSendMessageResponsePayload,
  isSendMessageResponse,
  isMessageHistoryResponse,
  isMessageDeliveredResponse,
  isMessageDeliveredPayload,
  isMessagesList,
  isMessageReadPayload,
  isMessageReadResponse,
  isMessageDeletePayload,
  isMessageDeleteResponse,
  isMessageEditPayload,
  isMessageEditResponse,
};
