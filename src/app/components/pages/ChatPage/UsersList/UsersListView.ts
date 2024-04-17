import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import classes from './UsersList.module.scss';

export default class UsersListView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super({ tagName: 'div', className: classes.list });
  }
}
