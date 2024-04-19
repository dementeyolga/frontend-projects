import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ChatPage.module.scss';
import HeaderView from '../../common/Header/HeaderView';
import { main, p } from '../../../utils/tagViews';
import LogoutButtonView from './LogoutButton/LogoutButtonView';
import UsersListView from './UsersList/UsersListView';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import { isUserCredentials } from '../../../types/typeGuards';
import { CustomEvents, StateKeys } from '../../../types/enums';
import ChatView from './Chat/ChatView';

export default class ChatPageView extends BaseComponentView {
  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  private chat: ChatView;

  private readonly main: BaseComponentView<HTMLElement>;

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

    this.chat = new ChatView();
    this.main = main(classes.main, new UsersListView(), this.chat);

    this.addChildrenComponents(
      'end',
      new HeaderView(...headerChilden),
      this.main,
    );

    this.initListeners();
  }

  private initListeners(): void {
    this.initOpenChatListener();
  }

  private initOpenChatListener(): void {
    this.element.addEventListener(CustomEvents.OpenChat, (ev) => {
      if (ev instanceof CustomEvent) {
        const username = ev.detail;

        if (typeof username === 'string') {
          this.main.removeChildComponent(this.chat);

          this.chat = new ChatView(username);
          this.main.addChildrenComponents('end', this.chat);
        }
      }
    });
  }
}
