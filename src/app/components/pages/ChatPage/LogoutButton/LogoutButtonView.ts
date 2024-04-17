import { Events } from '../../../../types/enums';
import ButtonView from '../../../common/Button/ButtonView';
import state from '../../../services/state/state';
import webSocketService from '../../../services/WebSocketService/WebSocketService';

export default class LogoutButtonView extends ButtonView {
  constructor() {
    super({ type: 'button', textContent: 'Logout' });

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener(Events.Click, () => {
      if (state.currentUser) {
        webSocketService.sendLogoutRequest(
          state.currentUser.login,
          state.currentUser.password,
        );
      }
    });
  }
}
