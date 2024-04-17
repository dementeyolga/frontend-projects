import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ChatPage.module.scss';
import state from '../../services/state/state';
import { Pathes, StorageKeys } from '../../../types/enums';
import HeaderView from '../../common/Header/HeaderView';
import { main, p } from '../../../utils/tagViews';
import LogoutButtonView from './LogoutButton/LogoutButtonView';
import UsersListView from './UsersList/UsersListView';

export default class ChatPageView extends BaseComponentView {
  constructor() {
    super({ tagName: 'div', className: classes.page });

    let user = state.currentUser;

    if (user === null) {
      const strUser = sessionStorage.getItem(StorageKeys.User);

      if (strUser) {
        user = JSON.parse(strUser);
      } else {
        window.location.hash = Pathes.Login;
      }
    }

    if (user) {
      this.addChildrenComponents(
        'end',
        new HeaderView(
          p('Fun Chat', classes.appName),
          p(user.login),
          new LogoutButtonView(),
        ),
        main(classes.main, new UsersListView()),
      );
    }
  }
}
