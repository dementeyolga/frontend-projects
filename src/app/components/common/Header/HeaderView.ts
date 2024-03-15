import BaseComponentView from '../../BaseComponent/BaseComponentView';
import LogoutButtonView from '../LogoutButton/LogoutButtonView';
import classes from './Header.module.scss';

export default class HeaderView extends BaseComponentView<HTMLElement> {
  constructor() {
    super(
      {
        tagName: 'header',
        className: classes.header,
      },
      undefined,
      new LogoutButtonView('#'),
    );
  }
}
