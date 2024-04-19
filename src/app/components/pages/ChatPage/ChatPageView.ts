import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ChatPage.module.scss';
import HeaderView from '../../common/Header/HeaderView';
import { main, p } from '../../../utils/tagViews';
import LogoutButtonView from './LogoutButton/LogoutButtonView';
import UsersListView from './UsersList/UsersListView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import { isUserCredentials } from '../../../types/typeGuards';
import { StateKeys } from '../../../types/enums';

export default class ChatPageView extends BaseComponentView {
  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  constructor() {
    super({ tagName: 'div', className: classes.page });

    const headerChilden = [
      p('Fun Chat', classes.appName),
      new LogoutButtonView(),
    ];

    const user = this.state.getValue(StateKeys.CurrentUser);

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
