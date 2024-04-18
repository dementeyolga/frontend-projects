export const enum Pathes {
  Login = '',
  Chat = 'chat',
}

export const enum SessionStorageKeys {
  User = 'funChatAppAuthenticatedUser',
}

export const enum StateKeys {
  Login = 'login',
  CurrentUser = 'currentUser',
  ActiveUsers = 'activeUsers',
  InactiveUsers = 'inactiveUsers',
}

export const enum RequestTypes {
  UserLogin = 'USER_LOGIN',
  UserLogout = 'USER_LOGOUT',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  UsersActive = 'USER_ACTIVE',
  UsersInactive = 'USER_INACTIVE',
  SendMessage = 'MSG_SEND',
  MessageHistory = 'MSG_FROM_USER',
  MessageDelivered = 'MSG_DELIVER',
  MessageRead = 'MSG_READ',
  DeleteMessage = 'MSG_DELETE',
  EditMessage = 'MSG_EDIT',
  Error = 'ERROR',
}

export const enum Events {
  Input = 'input',
  Submit = 'submit',
  Click = 'click',
}

export const enum CustomEvents {
  FormInput = 'form-input',
}

export const enum SocketEvents {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}
