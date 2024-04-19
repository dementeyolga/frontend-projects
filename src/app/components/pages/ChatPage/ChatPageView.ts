import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ChatPage.module.scss';
import { Pathes, SessionStorageKeys, StateKeys } from '../../../types/enums';
// import HeaderView from '../../common/Header/HeaderView';
// import { main, p } from '../../../utils/tagViews';
// import LogoutButtonView from './LogoutButton/LogoutButtonView';
// import UsersListView from './UsersList/UsersListView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import { isUserCredentials } from '../../../types/typeGuards';
import WebSocketService from '../../services/WebSocketService/WebSocketService';
// import { UserCredentials } from '../../../types/types';

export default class ChatPageView extends BaseComponentView {
  private readonly socket: WebSocketService = WebSocketService.getInstance();

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  constructor() {
    super({ tagName: 'div', className: classes.page });

    this.initLogin = this.initLogin.bind(this);
    // this.renderContent = this.renderContent.bind(this);

    // this.state.subscribe(StateKeys.Login, this.renderContent);
  }

  initLogin = (): void => {
    let user = this.state.getValue(StateKeys.CurrentUser);

    if (user === null) {
      const strUser = sessionStorage.getItem(SessionStorageKeys.User);

      if (strUser) {
        user = JSON.parse(strUser);

        if (isUserCredentials(user)) {
          this.socket.sendLoginRequest(user.login, user.password);
        }
      } else {
        window.location.hash = Pathes.Login;
      }
    }
  };

  // renderContent(): void {
  //   const headerChilden = [
  //     p('Fun Chat', classes.appName),
  //     new LogoutButtonView(),
  //   ];

  //   if (isUserCredentials(user)) {
  //     headerChilden.unshift(p(user.login));
  //   }

  //   this.addChildrenComponents(
  //     'end',
  //     new HeaderView(...headerChilden),
  //     main(classes.main, new UsersListView()),
  //   );
  // }
}
