import { SocketEvents } from '../../../types/enums';

class WebSocketService {
  private socket: WebSocket;

  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();
  }

  private openSocketConnection(url: string): void {
    try {
      this.socket = new WebSocket(`ws://${url}`);
    } catch (e) {
      console.log(e);
    }

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
      console.log(e.data);
    });
  }

  send(msg: string): void {
    this.socket.send(msg);
  }
}

const webSocketService = new WebSocketService('127.0.0.1:4000');
export default webSocketService;
