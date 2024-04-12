import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import { CustomEvents } from '../../../../types/enums';
import classes from './Form.module.scss';
import LabelView from '../../../common/Label/LabelView';
import InputView from '../../../common/Input/InputView';
import ButtonView from '../../../common/Button/ButtonView';

export default class FormView extends BaseComponentView<HTMLFormElement> {
  private readonly loginButton: ButtonView;

  constructor() {
    super(
      { tagName: 'form', className: classes.form, novalidate: true },

      new LabelView(
        'Login',
        new InputView({
          type: 'text',
          name: 'login',
          required: true,
          pattern: '[a-z\\-_]{3,}',
        }),
      ),

      new LabelView(
        'Password',
        new InputView({
          type: 'password',
          name: 'password',
          required: true,
          pattern: '[a-z\\-_]{8,}',
        }),
      ),
    );

    this.loginButton = new ButtonView({
      type: 'submit',
      textContent: 'Log in',
      disabled: true,
    });

    this.addChildrenComponents('end', this.loginButton);

    this.initListeners();
  }

  protected override setParameters(params: Partial<HTMLFormElement>): void {
    super.setParameters(params);

    const { novalidate } = params;
    if (novalidate) {
      this.element.noValidate = novalidate;
    }
  }

  private initListeners() {
    this.element.addEventListener(CustomEvents.FormInput, () => {
      if (this.element.checkValidity()) {
        this.loginButton.getElement().disabled = false;
      } else {
        this.loginButton.getElement().disabled = true;
      }
    });
  }
}
