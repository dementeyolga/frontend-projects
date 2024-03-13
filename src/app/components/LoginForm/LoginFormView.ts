import BaseComponentView from '../BaseComponent/BaseComponentView';
import LoginFormButtonView from './LoginFormButton/LoginFormButton';
import LoginFormLabelView from './LoginFormLabel/LoginFormLabelView';
import LoginFormInputView from './LoginFormInput/LoginFormIputView';
import LoginFormErrorMessageView from './LoginFormErrorMessage/LoginFormErrorMessageView';
import { div } from '../../utils/tagViews';
import { EventCallbacks } from '../../types/types';
import classes from './LoginForm.module.scss';

const loginFormEventCallbacks: EventCallbacks<HTMLFormElement> = {
  submit(ev: Event) {
    ev.preventDefault();
  },
};

export default class LoginFormView extends BaseComponentView<HTMLFormElement> {
  constructor() {
    super(
      { tagName: 'form', className: classes.form, novalidate: true },
      loginFormEventCallbacks,
      div(
        classes.inputWrapper,
        undefined,
        new LoginFormLabelView('First Name'),
        new LoginFormInputView(
          'text',
          'First name',
          true,
          3,
          '[A-Z]{1}[a-z\\-]{2,}',
        ),
        new LoginFormErrorMessageView(),
      ),
      div(
        classes.inputWrapper,
        undefined,
        new LoginFormLabelView('Surname'),
        new LoginFormInputView(
          'text',
          'Surname',
          true,
          4,
          '[A-Z]{1}[a-z\\-]{3,}',
        ),
        new LoginFormErrorMessageView(),
      ),
      new LoginFormButtonView(classes.button),
    );
  }

  protected override setParameters(params: Partial<HTMLFormElement>): void {
    super.setParameters(params);

    const { novalidate } = params;
    if (novalidate) {
      this.element.noValidate = novalidate;
    }
  }
}
