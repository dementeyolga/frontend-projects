import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import WebSocketService from '../../../services/WebSocketService/WebSocketService';
import classes from './UsersList.module.scss';

export default class UsersListView extends BaseComponentView<HTMLDivElement> {
  private readonly socket: WebSocketService = WebSocketService.getInstance();

  constructor() {
    super({ tagName: 'div', className: classes.list });

    this.socket.sendActiveUsersRequest();
  }
}
