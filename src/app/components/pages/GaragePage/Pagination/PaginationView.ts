import { CustomEvents } from '../../../../types/enums';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import ButtonView from '../../../common/Button/ButtonView';
import classes from './Pagination.module.scss';

export default class PaginationView extends BaseComponentView<HTMLDivElement> {
  private prevButton: ButtonView;

  private nextButton: ButtonView;

  constructor() {
    super({ tagName: 'div', className: classes.pagination });

    this.prevButton = new ButtonView(
      classes.button,
      'button',
      'Prev',
      undefined,
      true,
    );
    this.nextButton = new ButtonView(classes.button, 'button', 'Next');

    this.addChildrenComponents('end', this.prevButton, this.nextButton);

    this.initListeners();
  }

  setButtonStates(page: number, totalPages: number): void {
    if (totalPages === 0 || totalPages === 1) {
      this.prevButton.disable();
      this.nextButton.disable();
    } else if (page === 1) {
      this.prevButton.disable();
      this.nextButton.enable();
    } else if (page === totalPages) {
      this.prevButton.enable();
      this.nextButton.disable();
    } else {
      this.prevButton.enable();
      this.nextButton.enable();
    }
  }

  private initListeners(): void {
    this.nextButton.getElement().addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.NextPage, { bubbles: true }),
      );
    });

    this.prevButton.getElement().addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.PrevPage, { bubbles: true }),
      );
    });
  }
}
