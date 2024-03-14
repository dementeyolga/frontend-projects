import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import { EventCallbacks } from '../../../../../types/types';
import classes from './LoginFormButton.module.scss';

const buttonCallbacks: EventCallbacks<HTMLButtonElement> = {
  click(event) {
    if (event.isTrusted) {
      event.stopPropagation();
    }
  },
};

export default class LoginFormButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(className: string, link?: string) {
    super(
      {
        tagName: 'button',
        type: 'submit',
        textContent: 'Login',
        className: `${className} ${classes.button}`,
      },
      buttonCallbacks,
    );

    if (link) {
      this.element.dataset.navigate = link;
    }
  }

  protected override setParameters(params: Partial<HTMLButtonElement>): void {
    super.setParameters(params);

    const { type } = params;
    if (type) {
      this.element.type = type;
    }
  }
}
