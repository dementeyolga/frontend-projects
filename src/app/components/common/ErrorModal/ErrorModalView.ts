import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './ErrorModal.module.scss';
import { CustomEvents } from '../../../types/enums';
import { div, p } from '../../../utils/tagViews';
import ButtonView from '../Button/ButtonView';

export default class ErrorModalView extends BaseComponentView<HTMLDivElement> {
  private readonly closeButton: ButtonView;

  constructor(message: string) {
    super({
      tagName: 'div',
      className: classes.modalWrapper,
    });

    this.closeButton = new ButtonView({
      textContent: '✖',
      type: 'button',
      className: classes.closeButton,
    });

    this.addChildrenComponents(
      'end',
      div(classes.modal, p(message), this.closeButton),
    );

    setTimeout(() => {
      this.addClass(classes.visible);
    }, 0);

    this.initClickListener();
  }

  override destroy(): void {
    this.addClass(classes.invisible);

    this.element.ontransitionend = () => super.destroy();
  }

  private initClickListener(): void {
    this.element.onclick = ({ target }) => {
      if (target === this.element || target === this.closeButton.getElement()) {
        this.element.dispatchEvent(
          new CustomEvent(CustomEvents.RemoveErrorModal, { bubbles: true }),
        );
      }
    };
  }
}
