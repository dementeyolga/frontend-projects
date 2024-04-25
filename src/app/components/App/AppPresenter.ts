import { SessionStorageKeys, StateKeys } from '../../types/enums';
import { isUserCredentials } from '../../types/typeGuards';
import BaseComponentView from '../BaseComponent/BaseComponentView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../services/WebSocketService/WebSocketService';
import AppView from './AppView';

export default class AppPresenter {
  private readonly socket: WebSocketService = WebSocketService.getInstance();

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  constructor(private readonly view: AppView) {
    this.state.subscribe(StateKeys.OpenSocket, this.sendAutoLoginRequest);
  }

  render(root: HTMLElement): void {
    root.prepend(this.view.getElement());
  }

  setContent(view: BaseComponentView): void {
    console.log(`setting view`, view);

    this.view.removeChildrenComponents();
    this.view.addChildrenComponents('end', view);
  }

  sendAutoLoginRequest = (): void => {
    const userStr = sessionStorage.getItem(SessionStorageKeys.User);

    if (userStr) {
      const user = JSON.parse(userStr);

      if (isUserCredentials(user)) {
        console.log('sending AUTO login request');

        this.socket.sendLoginRequest(user.login, user.password);
      }
    }
  };
}
