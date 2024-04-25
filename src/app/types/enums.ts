export const enum Pathes {
  Login = '',
  About = 'about',
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
  LoginError = 'loginError',
  ResetUnreadMessages = 'resetUnreadMessages',
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
  Keydown = 'keydown',
}

export const enum CustomEvents {
  FormInput = 'form-input',
  FormChange = 'form-change',
  TextAreaInput = 'textarea-input',
  OpenChat = 'open-chat',
  SendChatMessage = 'send-chat-message',
  EditMessage = 'edit-message',
  RemoveErrorModal = 'remove-error-modal',
}

export const enum SocketEvents {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}

export const enum ServerErrorMessages {
  UserAlreadyAuthorized = 'a user with this login is already authorized',
  IncorrectPassword = 'incorrect password',
  LogoutWrongCredentials = 'there is no user with this login',
  LogoutUserNotAuthorized = 'the user was not authorized',
  SenderAndRecipientLoginsSame = 'sender and recipient logins are the same',
  MessageOperationWrongRecipientLogin = 'the user with the specified login does not exist',
  MessageOperationUserNotLogined = 'user not registered or not logged',
  WrongMessageID = 'incorrect message id',
  MessageOperationUserNotRecipient = 'user not recipient cannot be executed',

  IncorrectRequestStructure = 'incorrect request structure',
  IncorrectTypeParameters = 'incorrect type parameters',
  RequestPayloadNotSupported = 'incorrect payload parameters',
  InternalServerError = 'internal server error',
}
