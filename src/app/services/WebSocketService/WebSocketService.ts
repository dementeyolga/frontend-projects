import {
  RequestTypes,
  ServerErrorMessages,
  SessionStorageKeys,
  SocketEvents,
  StateKeys,
} from '../../types/enums';
import {
  isActiveUsersResponse,
  isErrorResponse,
  isExternalLoginResponse,
  isExternalLogoutResponse,
  isInActiveUsersResponse,
  isLoginRequest,
  isLoginResponse,
  isLogoutResponse,
  isMessageDeleteResponse,
  isMessageDeliveredResponse,
  isMessageEditResponse,
  isMessageHistoryResponse,
  isMessageReadResponse,
  isSendMessageResponse,
} from '../../types/typeGuards';
import {
  ActiveUsersRequest,
  MessageDeleteRequest,
  InactiveUsersRequest,
  LoginRequest,
  LogoutRequest,
  MessageHistoryRequest,
  MessageReadRequest,
  Payloads,
  SendMessageRequest,
  WSRequest,
  MessageEditRequest,
} from '../../types/types';
import StateManagementService from '../StateManagementService/StateManagementService';

export default class WebSocketService {
  private static readonly instance = new WebSocketService('127.0.0.1:4000');

  private socket: WebSocket;

  private state: StateManagementService = StateManagementService.getInstance();

  private requests: WSRequest<RequestTypes, Payloads>[] = [];

  private constructor(private url: string) {
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();
  }

  static getInstance(): WebSocketService {
    return this.instance;
  }

  private openSocketConnection(url: string): void {
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();
  }

  private initSocketListeners(): void {
    this.initOpenListener();
  }

  private initOpenListener(): void {
    this.socket.addEventListener(SocketEvents.Open, () => {
      console.log('socket has opened');

      this.initMessageListener();
      this.initErrorListener();
      this.initCloseListener();

      this.state.setValue(StateKeys.OpenSocket, 'open');
    });
  }

  private initCloseListener(): void {
    this.socket.addEventListener(SocketEvents.Close, () => {
      console.log('socket has closed');

      this.openSocketConnection(this.url);
      this.initOpenListener();
    });
  }

  private initErrorListener(): void {
    this.socket.addEventListener(SocketEvents.Error, (ev) => {
      console.log('WebSocket error: ', ev);
    });
  }

  private initMessageListener(): void {
    this.socket.addEventListener(SocketEvents.Message, (e) => {
      const message = JSON.parse(e.data);

      if (isLoginResponse(message)) {
        console.log('user logined: ', message);

        const request = this.requests.find(
          (req) => req.id === message.id && req.type === RequestTypes.UserLogin,
        );

        if (request && isLoginRequest(request)) {
          const { user } = request.payload;

          sessionStorage.setItem(SessionStorageKeys.User, JSON.stringify(user));

          this.state.setValue(StateKeys.CurrentUser, user);
        }
      }

      if (isLogoutResponse(message)) {
        sessionStorage.removeItem(SessionStorageKeys.User);
        this.state.setValue(StateKeys.CurrentUser, null);
      }

      if (isActiveUsersResponse(message)) {
        console.log('active users response', message);
        this.state.setValue(StateKeys.ActiveUsers, message.payload.users);
      }

      if (isInActiveUsersResponse(message)) {
        console.log('inactive users response', message);
        this.state.setValue(StateKeys.InactiveUsers, message.payload.users);
      }

      if (isExternalLoginResponse(message)) {
        console.log('user logged in', message.payload.user);
        this.state.setValue(
          StateKeys.ExternalLogin,
          message.payload.user.login,
        );
      }

      if (isExternalLogoutResponse(message)) {
        console.log('user logged out', message.payload.user);
        this.state.setValue(
          StateKeys.ExternalLogout,
          message.payload.user.login,
        );
      }

      if (isSendMessageResponse(message)) {
        if (message.id === null) {
          console.log('message received', message);
          this.state.setValue(
            StateKeys.MessageReceived,
            message.payload.message,
          );
        } else {
          console.log('message successfully sent', message);
          this.state.setValue(StateKeys.MessageSent, message.payload.message);
        }
      }

      if (isMessageHistoryResponse(message)) {
        console.log('message history received', message);
        this.state.setValue(StateKeys.MessageHistory, message.payload.messages);
      }

      if (isMessageDeliveredResponse(message)) {
        console.log('message status changed to DELIVERED', message);

        this.state.setValue(StateKeys.MessageDelivered, message.payload);
      }

      if (isMessageReadResponse(message)) {
        console.log('message was READ', message);

        this.state.setValue(StateKeys.MessageRead, message.payload);
      }

      if (isMessageDeleteResponse(message)) {
        console.log('need to DELETE a message', message);

        this.state.setValue(StateKeys.MessageDeleted, message.payload);
      }

      if (isMessageEditResponse(message)) {
        console.log('need to EDIT a message', message);

        this.state.setValue(StateKeys.MessageEdited, message.payload);
      }

      if (isErrorResponse(message)) {
        console.log('error', message.payload);

        const { error: errorMessage } = message.payload;

        if (
          errorMessage === ServerErrorMessages.UserAlreadyAuthorized ||
          errorMessage === ServerErrorMessages.IncorrectPassword
        ) {
          this.state.setValue(StateKeys.LoginError, errorMessage);
        }
      }
    });
  }

  sendLoginRequest(login: string, password: string): void {
    const data: LoginRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.UserLogin,
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendLogoutRequest(login: string, password: string): void {
    const data: LogoutRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.UserLogout,
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendActiveUsersRequest(): void {
    const data: ActiveUsersRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.UsersActive,
      payload: null,
    };

    this.requests.push(data);

    this.send(data);
  }

  sendInActiveUsersRequest(): void {
    const data: InactiveUsersRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.UsersInactive,
      payload: null,
    };

    this.requests.push(data);

    this.send(data);
  }

  sendChatMessage(to: string, text: string): void {
    const data: SendMessageRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.SendMessage,
      payload: {
        message: {
          to,
          text,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendMessageHistoryRequest(login: string): void {
    const data: MessageHistoryRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.MessageHistory,
      payload: {
        user: {
          login,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendReadMessageRequest(id: string) {
    const data: MessageReadRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.MessageRead,
      payload: {
        message: {
          id,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendDeleleMessageRequest(id: string): void {
    const data: MessageDeleteRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.DeleteMessage,
      payload: {
        message: {
          id,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  sendEditMessageRequest(id: string, text: string): void {
    const data: MessageEditRequest = {
      id: String(this.requests.length + 1),
      type: RequestTypes.EditMessage,
      payload: {
        message: {
          id,
          text,
        },
      },
    };

    this.requests.push(data);

    this.send(data);
  }

  private send(data: object): void {
    const msg = JSON.stringify(data);
    this.socket.send(msg);
  }
}
