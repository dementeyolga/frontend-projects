import { EventCallbacks } from '../../../types/types';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './Button.module.scss';

export default class ButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(
    className: string,
    type: 'submit' | 'button',
    textContent: string,
    link?: string,
    disabled?: boolean,
    buttonCallbacks?: EventCallbacks<HTMLButtonElement>,
  ) {
    super(
      {
        tagName: 'button',
        type,
        textContent,
        className: `${className} ${classes.button}`,
        disabled,
      },
      buttonCallbacks,
    );

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
}
