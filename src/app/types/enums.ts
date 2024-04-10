export const enum RequestTypes {
  UserLogin = 'USER_LOGIN',
  UserLogout = 'USER_LOGOUT',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  UserActive = 'USER_ACTIVE',
  UserInactive = 'USER_INACTIVE',
  SendMessage = 'MSG_SEND',
  MessageHistory = 'MSG_FROM_USER',
  MessageDelivered = 'MSG_DELIVER',
  MessageRead = 'MSG_READ',
  DeleteMessage = 'MSG_DELETE',
  EditMessage = 'MSG_EDIT',
  Error = 'ERROR',
}

export const enum CustomEvents {}

export const enum SocketEvents {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}
