import BaseComponentView from '../../BaseComponent/BaseComponentView';
import LoginFormView from './LoginForm/LoginFormView';
import { h1 } from '../../../utils/tagViews';
import classes from './LoginPage.module.scss';

export default class LoginPageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.page,
      },
      undefined,
      h1(classes.h1, 'RSS Puzzle'),
      new LoginFormView(),
    );
  }
}
