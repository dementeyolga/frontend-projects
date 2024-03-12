import BaseComponentView from '../BaseComponent/BaseComponentView';
import LoginFormButtonView from './LoginFormButton/LoginFormButton';
import LoginFormLabelView from './LoginFormLabel/LoginFormLabelView';
import classes from './LoginForm.module.scss';

export default class LoginFormView extends BaseComponentView {
  constructor() {
    super(
      { tagName: 'form', className: classes.form },
      new LoginFormLabelView('First Name', 'text'),
      new LoginFormLabelView('Surname', 'text'),
      new LoginFormButtonView(classes.button),
    );
  }
}
