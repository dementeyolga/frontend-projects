import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './LoginFormButton.module.scss';

export default class LoginFormButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(className: string) {
    super({
      tagName: 'button',
      type: 'submit',
      textContent: 'Login',
      className: `${className} ${classes.button}`,
    });
  }

  protected override setParameters(params: Partial<HTMLButtonElement>): void {
    super.setParameters(params);

    const { type } = params;
    if (type) {
      this.element.type = type;
    }
  }
}
