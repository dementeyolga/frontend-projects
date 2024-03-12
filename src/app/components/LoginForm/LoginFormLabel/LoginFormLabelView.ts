import BaseComponentView from '../../BaseComponent/BaseComponentView';
import LoginFormInputView from '../LoginFormInput/LoginFormIputView';
import classes from './LoginFormLabel.module.scss';

export default class LoginFormLabelView extends BaseComponentView {
  protected declare element: HTMLLabelElement;

  constructor(labelName: string, inputType: string) {
    super(
      { tagName: 'label', textContent: labelName, className: classes.label },
      new LoginFormInputView(inputType, true),
    );
  }
}
