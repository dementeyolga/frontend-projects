import { Events, StateKeys } from '../../../../types/enums';
import { isUserCredentials } from '../../../../types/typeGuards';
import ButtonView from '../../../common/Button/ButtonView';
import StateManagementService from '../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../services/WebSocketService/WebSocketService';

export default class LogoutButtonView extends ButtonView {
  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  private readonly socket: WebSocketService = WebSocketService.getInstance();

  constructor() {
    super({ type: 'button', textContent: 'Logout' });

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener(Events.Click, () => {
      const user = this.state.getValue(StateKeys.CurrentUser);

      console.log(this.state);

      if (user && isUserCredentials(user)) {
        this.socket.sendLogoutRequest(user.login, user.password);
      }
    });
  }
}
