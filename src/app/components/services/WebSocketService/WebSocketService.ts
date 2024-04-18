import {
  Pathes,
  RequestTypes,
  SessionStorageKeys,
  SocketEvents,
  StateKeys,
} from '../../../types/enums';
import {
  isActiveUsersResponse,
  isLoginRequest,
  isLoginResponse,
  isLogoutResponse,
} from '../../../types/typeGuards';
import {
  ActiveUsersRequest,
  InactiveUsersRequest,
  LoginRequest,
  LogoutRequest,
  Payloads,
  WSRequest,
} from '../../../types/types';
import StateManagementService from '../StateManagementService/StateManagementService';

export default class WebSocketService {
  private static readonly instance = new WebSocketService('127.0.0.1:4000');

  private socket: WebSocket;

  private url: string;

  private state: StateManagementService;

  private requests: WSRequest<RequestTypes, Payloads>[] = [];

  private constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();

    this.state = StateManagementService.getInstance();
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
          console.log('relevant login request: ', request);

          sessionStorage.setItem(
            SessionStorageKeys.User,
            JSON.stringify(request.payload.user),
          );

          this.state.setValue(StateKeys.CurrentUser, request.payload.user);
        }

        window.location.hash = Pathes.Chat;
      }

      if (isLogoutResponse(message)) {
        sessionStorage.removeItem(SessionStorageKeys.User);
        this.state.setValue(StateKeys.CurrentUser, null);
        window.location.hash = Pathes.Login;
      }

      if (isActiveUsersResponse(message)) {
        console.log('active users response', message);
      }
    });
  }

  private send(data: object): void {
    const msg = JSON.stringify(data);
    this.socket.send(msg);
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
}
