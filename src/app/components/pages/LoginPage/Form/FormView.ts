import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import { CustomEvents, Events } from '../../../../types/enums';
import classes from './Form.module.scss';
import LabelView from '../../../common/Label/LabelView';
import InputView from '../../../common/Input/InputView';
import ButtonView from '../../../common/Button/ButtonView';
import WebSocketService from '../../../../services/WebSocketService/WebSocketService';

export default class FormView extends BaseComponentView<HTMLFormElement> {
  private readonly loginInput: InputView;

  private readonly passwordInput: InputView;

  private readonly loginButton: ButtonView;

  private readonly socket: WebSocketService = WebSocketService.getInstance();

  constructor() {
    super({ tagName: 'form', className: classes.form, novalidate: true });

    this.loginInput = new InputView(
      {
        type: 'text',
        name: 'login',
        required: true,
        pattern: '^[0-9A-Za-z\\-_]{3,16}$',
        minLength: 3,
      },
      `Login must contain only English letters, digits, hyphen or underscore (max 15 symbols)`,
    );

    this.passwordInput = new InputView(
      {
        type: 'password',
        name: 'password',
        required: true,
        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
        minLength: 8,
      },
      'Password must contain at least 1 uppercase and 1 lowercase English letter and a digit',
    );

    this.loginButton = new ButtonView({
      type: 'submit',
      textContent: 'Log in',
      disabled: true,
    });

    this.addChildrenComponents(
      'end',
      new LabelView('Login', this.loginInput),
      new LabelView('Password', this.passwordInput),
      this.loginButton,
    );

    this.initListeners();
  }

  protected override setParameters(params: Partial<HTMLFormElement>): void {
    super.setParameters(params);

    const { novalidate } = params;
    if (novalidate) {
      this.element.noValidate = novalidate;
    }
  }

  private initListeners(): void {
    this.initSubmitListener();
    this.initFormInputListener();
  }

  private initSubmitListener(): void {
    this.element.addEventListener(Events.Submit, (e) => {
      e.preventDefault();

      const login = this.loginInput.getValue();
      const password = this.passwordInput.getValue();

      this.socket.sendLoginRequest(login, password);
    });
  }

  private initFormInputListener(): void {
    this.element.addEventListener(CustomEvents.FormInput, () => {
      if (this.element.checkValidity()) {
        this.loginButton.getElement().disabled = false;
      } else {
        this.loginButton.getElement().disabled = true;
      }
    });
  }
}
