import { CustomEvents, StateKeys } from '../../../../types/enums';
import { isUserCredentials, isUsersList } from '../../../../types/typeGuards';
import { div } from '../../../../utils/tagViews';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import InputView from '../../../common/Input/InputView';
import StateManagementService from '../../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../../services/WebSocketService/WebSocketService';
import UserNameView from './UserName/UserNameView';
import classes from './UsersList.module.scss';
import getOwnTextContent from '../../../../utils/getOwnTextContent';

export default class UsersListView extends BaseComponentView<HTMLDivElement> {
  private readonly socket: WebSocketService = WebSocketService.getInstance();

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  private readonly activeUsersContainer: BaseComponentView<HTMLDivElement>;

  private readonly inactiveUsersContainer: BaseComponentView<HTMLDivElement>;

  private readonly searchInput: InputView;

  constructor() {
    super({ tagName: 'div', className: classes.list });

    this.searchInput = new InputView({ type: 'search' });
    this.activeUsersContainer = div();
    this.inactiveUsersContainer = div();

    this.addChildrenComponents(
      'end',
      this.searchInput,
      this.activeUsersContainer,
      this.inactiveUsersContainer,
    );

    this.socket.sendActiveUsersRequest();
    this.socket.sendInActiveUsersRequest();

    this.state.subscribe(StateKeys.ActiveUsers, this.updateActiveUsersList);
    this.state.subscribe(StateKeys.InactiveUsers, this.updateInActiveUsersList);

    this.state.subscribe(StateKeys.ExternalLogin, this.handleExternalLogin);
    this.state.subscribe(StateKeys.ExternalLogout, this.handleExternalLogout);

    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.initClickListener();
    this.initSearchInputListener();
  }

  private initClickListener(): void {
    this.element.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLParagraphElement) {
        target.dispatchEvent(
          new CustomEvent(CustomEvents.OpenChat, {
            bubbles: true,
            detail: getOwnTextContent(target),
          }),
        );
      }
    });
  }

  private initSearchInputListener(): void {
    this.element.addEventListener(CustomEvents.FormInput, (ev) => {
      if (ev instanceof CustomEvent) {
        const text = ev.detail;

        if (typeof text === 'string') {
          this.activeUsersContainer.children.forEach((comp) => {
            if (
              comp instanceof UserNameView &&
              comp.username.startsWith(text)
            ) {
              comp.removeClass(classes.hidden);
            } else {
              comp.addClass(classes.hidden);
            }
          });

          this.inactiveUsersContainer.children.forEach((comp) => {
            if (
              comp instanceof UserNameView &&
              comp.username.startsWith(text)
            ) {
              comp.removeClass(classes.hidden);
            } else {
              comp.addClass(classes.hidden);
            }
          });
        }
      }
    });
  }

  private updateActiveUsersList = (): void => {
    const users = this.state.getValue(StateKeys.ActiveUsers);
    const currentUser = this.state.getValue(StateKeys.CurrentUser);
    const currentUserLogin = isUserCredentials(currentUser)
      ? currentUser.login
      : null;

    if (isUsersList(users)) {
      const children = users.reduce((acc, curr) => {
        if (curr.login !== currentUserLogin) {
          acc.push(
            new UserNameView(curr.login, `${classes.user} ${classes.online}`),
          );
        }

        return acc;
      }, [] as BaseComponentView<HTMLParagraphElement>[]);

      this.activeUsersContainer.removeChildrenComponents();
      this.activeUsersContainer.addChildrenComponents('end', ...children);
    }
  };

  private updateInActiveUsersList = (): void => {
    const users = this.state.getValue(StateKeys.InactiveUsers);

    if (isUsersList(users)) {
      const children = users.map(
        (user) =>
          new UserNameView(user.login, `${classes.user} ${classes.offline}`),
      );

      this.inactiveUsersContainer.removeChildrenComponents();
      this.inactiveUsersContainer.addChildrenComponents('end', ...children);
    }
  };

  private handleExternalLogin = (): void => {
    const login = this.state.getValue(StateKeys.ExternalLogin);

    if (
      typeof login === 'string' &&
      !this.activeUsersContainer.findChildComponentByTextContent(login)
    ) {
      console.log(
        'EXTERNAL LOGIN REMOVING FROM INACTIVE ADDING TO ACTIVE',
        login,
      );

      this.inactiveUsersContainer.removeChildComponent(login);
      this.activeUsersContainer.addChildrenComponents(
        'begin',
        new UserNameView(login, `${classes.user} ${classes.online}`),
      );
    }
  };

  private handleExternalLogout = (): void => {
    const login = this.state.getValue(StateKeys.ExternalLogout);

    if (
      typeof login === 'string' &&
      !this.inactiveUsersContainer.findChildComponentByTextContent(login)
    ) {
      console.log(
        'EXTERNAL LOGIN REMOVING FROM ACTIVE ADDING TO INACTIVE',
        login,
      );

      this.activeUsersContainer.removeChildComponent(login);
      this.inactiveUsersContainer.addChildrenComponents(
        'begin',
        new UserNameView(login, `${classes.user} ${classes.offline}`),
      );
    }
  };
}
