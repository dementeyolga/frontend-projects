import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ChatPage.module.scss';
import { Pathes, SessionStorageKeys, StateKeys } from '../../../types/enums';
import HeaderView from '../../common/Header/HeaderView';
import { main, p } from '../../../utils/tagViews';
import LogoutButtonView from './LogoutButton/LogoutButtonView';
import UsersListView from './UsersList/UsersListView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import { isUserCredentials } from '../../../types/typeGuards';

export default class ChatPageView extends BaseComponentView {
  constructor() {
    super({ tagName: 'div', className: classes.page });

    const state = StateManagementService.getInstance();
    let user = state.getValue(StateKeys.CurrentUser);

    if (user === null) {
      const strUser = sessionStorage.getItem(SessionStorageKeys.User);

      if (strUser) {
        user = JSON.parse(strUser);
      } else {
        window.location.hash = Pathes.Login;
      }
    }

    const headerChilden = [
      p('Fun Chat', classes.appName),
      new LogoutButtonView(),
    ];

    if (isUserCredentials(user)) {
      headerChilden.unshift(p(user.login));
    }

    this.addChildrenComponents(
      'end',
      new HeaderView(...headerChilden),
      main(classes.main, new UsersListView()),
    );
  }
}
