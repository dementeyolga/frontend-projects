import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import { Car } from '../../../../types/types';
import classes from './WinModal.module.scss';
import { CustomEvents } from '../../../../types/enums';

export default class WinModalView extends BaseComponentView<HTMLDivElement> {
  constructor(winner: Car, raceTime: number) {
    super({
      tagName: 'div',
      className: classes.modal,
      textContent: `The ${winner.name} car won the race in ${raceTime} sec`,
    });

    setTimeout(() => {
      this.addClass(classes.visible);
    }, 0);

    this.initClickListener();
  }

  private initClickListener(): void {
    this.element.onclick = () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.RemoveWinModal, { bubbles: true }),
      );
    };
  }

  override destroy(): void {
    this.addClass(classes.invisible);

    this.element.ontransitionend = () => super.destroy();
  }
}
