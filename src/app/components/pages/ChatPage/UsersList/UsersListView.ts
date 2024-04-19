import { StateKeys } from '../../../../types/enums';
import { isUsersList } from '../../../../types/typeGuards';
import { p } from '../../../../utils/tagViews';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../services/StateManagementService/StateManagementService';
// import WebSocketService from '../../../services/WebSocketService/WebSocketService';
import classes from './UsersList.module.scss';

export default class UsersListView extends BaseComponentView<HTMLDivElement> {
  // private readonly socket: WebSocketService = WebSocketService.getInstance();

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  constructor() {
    super({ tagName: 'div', className: classes.list });

    this.state.subscribe(StateKeys.OpenSocket, this.updateList);
    this.state.subscribe(StateKeys.ActiveUsers, this.updateList);
    this.state.subscribe(StateKeys.InactiveUsers, this.updateList);
  }

  updateList = (): void => {
    const users = this.state.getValue(StateKeys.ActiveUsers);

    if (isUsersList(users)) {
      users.forEach((user) => {
        p(user.login, `${classes.user} ${classes.online}`);
      });
    }
  };
}
