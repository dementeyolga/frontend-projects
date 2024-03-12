import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './LoginFormInput.module.scss';

export default class LoginFormInputView extends BaseComponentView<HTMLInputElement> {
  protected declare element: HTMLInputElement;

  constructor(type: string, required?: boolean) {
    super({ tagName: 'input', className: classes.input, type, required });
  }

  protected override setParameters(params: Partial<HTMLInputElement>): void {
    super.setParameters(params);

    const { type, required } = params;
    if (type) {
      this.element.type = type;
    }

    if (required) {
      this.element.required = required;
    }
  }
}
