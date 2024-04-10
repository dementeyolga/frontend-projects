import { SocketEvents } from '../../../types/enums';

export default class WebSocketService {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(`ws://${url}`);
    this.initSocketListeners();
  }

  private initSocketListeners(): void {
    this.initOpenListener();
  }

  private initOpenListener(): void {
    this.socket.addEventListener(SocketEvents.Open, () => {
      this.initCloseListener();
      this.initMessageListener();
    });
  }

  private initCloseListener(): void {
    this.socket.addEventListener(SocketEvents.Close, () => {
      this.initOpenListener();
    });
  }

  private initMessageListener(): void {
    this.socket.addEventListener(SocketEvents.Message, (e) => {
      console.log(e.data);
    });
  }
}
