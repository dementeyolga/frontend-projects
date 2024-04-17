import {
  Pathes,
  RequestTypes,
  SocketEvents,
  StorageKeys,
} from '../../../types/enums';
import {
  isLoginRequest,
  isLoginResponse,
  isLogoutResponse,
} from '../../../types/typeGuards';
import {
  LoginRequest,
  LogoutRequest,
  Payloads,
  WSRequest,
} from '../../../types/types';
import state from '../state/state';

class WebSocketService {
  private socket: WebSocket;

  private url: string;

  requests: WSRequest<RequestTypes, Payloads>[] = [];

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();
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
            StorageKeys.User,
            JSON.stringify(request.payload.user),
          );

          state.currentUser = request.payload.user;
        }

        window.location.hash = Pathes.Chat;
      }

      if (isLogoutResponse(message)) {
        sessionStorage.removeItem(StorageKeys.User);
        state.currentUser = null;
        window.location.hash = Pathes.Login;
      }
    });
  }

  send(data: object): void {
    const msg = JSON.stringify(data);
    this.socket.send(msg);
  }

  sendLoginRequest(login: string, password: string): void {
    const data: LoginRequest = {
      id: String(this.requests.length + 1), // ? performance.now()
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
}

const webSocketService = new WebSocketService('127.0.0.1:4000');
export default webSocketService;
