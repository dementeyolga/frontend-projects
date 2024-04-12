import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './Button.module.scss';

type ButtomParams = {
  type: 'submit' | 'button';
  textContent: string;
  link?: string;
  disabled?: boolean;
};

export default class ButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(params: ButtomParams, link?: string) {
    super({
      tagName: 'button',
      className: classes.button,
      ...params,
    });

    if (link) {
      this.element.dataset.navigate = link;
    }
  }

  protected override setParameters(params: Partial<HTMLButtonElement>): void {
    super.setParameters(params);

    const { type, disabled } = params;
    if (type) {
      this.element.type = type;
    }

    if (disabled) {
      this.element.disabled = disabled;
    }
  }

  disable(): void {
    this.element.disabled = true;
  }

  enable(): void {
    this.element.disabled = false;
  }
}
