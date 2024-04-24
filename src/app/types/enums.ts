export const enum Pathes {
  Login = '',
  Chat = 'chat',
}

export const enum SessionStorageKeys {
  User = 'funChatAppAuthenticatedUser',
}

export const enum StateKeys {
  OpenSocket = 'openSocket',
  Login = 'login',
  CurrentUser = 'currentUser',
  ActiveUsers = 'activeUsers',
  InactiveUsers = 'inactiveUsers',
  ExternalLogin = 'externalLogin',
  ExternalLogout = 'externalLogout',
  MessageSent = 'messageSent',
  MessageReceived = 'messageReceived',
  MessageHistory = 'messageHistory',
  MessageDelivered = 'messageDelivered',
  MessageRead = 'messageRead',
  MessageDeleted = 'messageDeleted',
  MessageEdited = 'messageEdited',
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
  Change = 'change',
  Submit = 'submit',
  Click = 'click',
  Scroll = 'scroll',
}

export const enum CustomEvents {
  FormInput = 'form-input',
  FormChange = 'form-change',
  TextAreaInput = 'textarea-input',
  OpenChat = 'open-chat',
  SendChatMessage = 'send-chat-message',
  EditMessage = 'edit-message',
}

export const enum SocketEvents {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}
