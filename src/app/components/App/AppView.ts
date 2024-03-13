import { h1 } from '../../utils/tagViews';
import BaseComponentView from '../BaseComponent/BaseComponentView';
import LoginFormView from '../LoginForm/LoginFormView';
import classes from './AppView.module.scss';
import '../../../styles/main.scss';

export default class AppView extends BaseComponentView {
  constructor() {
    super(
      { tagName: 'div', className: classes.app },
      undefined,
      h1(classes.h1, 'RSS Puzzle'),
      new LoginFormView(),
    );
  }
}
