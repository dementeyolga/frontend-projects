import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './LoginFormErrorMessage.module.scss';

export default class LoginFormErrorMessageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super({
      tagName: 'div',
      className: classes.message,
    });
  }
}
