import { RequestTypes } from './enums';

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

// Types of requests and responses from server
export type WSRequest<Type extends RequestTypes, Payload> = {
  id: string | null;
  type: Type;
  payload: Payload;
};

export type LoginRequest = WSRequest<
  RequestTypes.UserLogin,
  UserCredentialsPayload
>;

export type LoginResponse = WSRequest<
  RequestTypes.UserLogin,
  LoginStatusPayload
>;

export type LogoutRequest = WSRequest<
  RequestTypes.UserLogout,
  UserCredentialsPayload
>;

export type LogoutResponse = WSRequest<
  RequestTypes.UserLogout,
  LoginStatusPayload
>;

export type ExternalLoginResponse = WSRequest<
  RequestTypes.UserExternalLogin,
  LoginStatusPayload
>;

export type ExternalLogoutResponse = WSRequest<
  RequestTypes.UserExternalLogout,
  LoginStatusPayload
>;

export type ActiveUsersRequest = WSRequest<RequestTypes.UsersActive, null>;

export type ActiveUsersResponse = WSRequest<
  RequestTypes.UsersActive,
  UsersPayload
>;

export type InactiveUsersRequest = WSRequest<RequestTypes.UsersInactive, null>;

export type InactiveUsersResponse = WSRequest<
  RequestTypes.UsersInactive,
  UsersPayload
>;

export type SendMessageRequest = WSRequest<
  RequestTypes.SendMessage,
  SendMessageRequestPayload
>;

export type SendMessageResponse = WSRequest<
  RequestTypes.SendMessage,
  SendMessageResponsePayload
>;

export type MessageHistoryRequest = WSRequest<
  RequestTypes.MessageHistory,
  MessageHistoryRequestPayload
>;

export type MessageHistoryResponse = WSRequest<
  RequestTypes.MessageHistory,
  MessageHistoryResponsePayload
>;

export type MessageDeliveredResponse = WSRequest<
  RequestTypes.MessageDelivered,
  MessageDeliveredPayload
>;

export type MessageReadRequest = WSRequest<
  RequestTypes.MessageRead,
  MessageIDPayload
>;

export type MessageReadResponse = WSRequest<
  RequestTypes.MessageRead,
  MessageReadPayload
>;

export type MessageDeleteRequest = WSRequest<
  RequestTypes.DeleteMessage,
  MessageIDPayload
>;

export type MessageDeleteResponse = WSRequest<
  RequestTypes.DeleteMessage,
  MessageDeletePayload
>;

export type MessageEditRequest = WSRequest<
  RequestTypes.EditMessage,
  MessageEditRequestPayload
>;

export type MessageEditResponse = WSRequest<
  RequestTypes.EditMessage,
  MessageEditResponsePayload
>;

export type ErrorResponse = WSRequest<RequestTypes.Error, ErrorPayload>;

export type ResponseTypes =
  | LoginResponse
  | LogoutResponse
  | ExternalLoginResponse
  | ExternalLogoutResponse
  | ActiveUsersResponse
  | InactiveUsersResponse
  | SendMessageResponse
  | MessageHistoryResponse
  | MessageDeliveredResponse
  | MessageReadResponse
  | MessageDeleteResponse
  | MessageEditResponse;

// Payloads
export type UserStatus = {
  login: string;
  isLogined: boolean;
};

export type UserCredentials = {
  login: string;
  password: string;
};

export type UserCredentialsPayload = {
  user: UserCredentials;
};

export type LoginStatusPayload = {
  user: UserStatus;
};

export type UsersPayload = {
  users: UserStatus[];
};

export type Message = {
  to: string;
  text: string;
};

export type MessageStatus = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

export type MessageData = Message & {
  id: string;
  from: string;
  datetime: number;
  status: MessageStatus;
};

export type SendMessageRequestPayload = {
  message: Message;
};

export type SendMessageResponsePayload = {
  message: MessageData;
};

export type MessageHistoryRequestPayload = {
  user: { login: string };
};

export type MessageHistoryResponsePayload = {
  messages: MessageData[];
};

export type MessageDeletePayload = {
  message: {
    id: string;
    status: {
      isDeleted: boolean;
    };
  };
};

export type MessageIDPayload = {
  message: {
    id: string;
  };
};

export type MessageEditRequestPayload = {
  message: {
    id: string;
    text: string;
  };
};

// Change message status
export type MessageDeliveredPayload = {
  message: {
    id: string;
    status: Pick<MessageStatus, 'isDelivered'>;
  };
};

export type MessageReadPayload = {
  message: {
    id: string;
    status: Pick<MessageStatus, 'isReaded'>;
  };
};

export type MessageEditResponsePayload = {
  message: {
    id: string;
    text: string;
    status: Pick<MessageStatus, 'isEdited'>;
  };
};

export type ErrorPayload = {
  error: string;
};

export type Payloads =
  | UserCredentialsPayload
  | LoginStatusPayload
  | UsersPayload
  | SendMessageRequestPayload
  | SendMessageResponsePayload
  | MessageHistoryRequestPayload
  | MessageHistoryResponsePayload
  | MessageDeletePayload
  | MessageIDPayload
  | MessageEditRequestPayload
  | MessageDeliveredPayload
  | MessageReadPayload
  | MessageEditResponsePayload
  | ErrorPayload
  | null;
