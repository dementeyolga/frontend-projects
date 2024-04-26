import BaseComponentView from '../BaseComponent/BaseComponentView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../services/WebSocketService/WebSocketService';
import ErrorModalView from '../common/ErrorModal/ErrorModalView';
import { CustomEvents, SessionStorageKeys, StateKeys } from '../../types/enums';
import { isUserCredentials } from '../../types/typeGuards';
import '../../../styles/main.scss';
import classes from './AppView.module.scss';

export default class AppView extends BaseComponentView {
  private readonly socket: WebSocketService = WebSocketService.getInstance();

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  private errorModal: ErrorModalView | null = null;

  constructor() {
    super({ tagName: 'div', className: classes.app });

    this.state.subscribe(StateKeys.LoginError, this.showErrorModal);
    this.state.subscribe(StateKeys.OpenSocket, this.sendAutoLoginRequest);

    this.initListeners();
  }

  override destroy(): void {
    super.destroy();
    this.state.unsubscribe(StateKeys.LoginError, this.showErrorModal);
    this.state.unsubscribe(StateKeys.OpenSocket, this.sendAutoLoginRequest);
  }

  render(root: HTMLElement): void {
    root.prepend(this.getElement());
  }

  setContent(view: BaseComponentView): void {
    this.removeChildrenComponents();
    this.addChildrenComponents('end', view);
  }

  sendAutoLoginRequest = (): void => {
    const userStr = sessionStorage.getItem(SessionStorageKeys.User);

    if (userStr) {
      const user = JSON.parse(userStr);

      if (isUserCredentials(user)) {
        this.socket.sendLoginRequest(user.login, user.password);
      }
    }
  };

  private showErrorModal = (): void => {
    const errorMessage = this.state.getValue(StateKeys.LoginError);

    if (typeof errorMessage === 'string') {
      this.errorModal = new ErrorModalView(errorMessage);
      this.addChildrenComponents('end', this.errorModal);
    }
  };

  private initListeners(): void {
    this.element.addEventListener(CustomEvents.RemoveErrorModal, () => {
      if (this.errorModal) {
        this.removeChildComponent(this.errorModal);

        this.errorModal = null;
      }
    });
  }
}
