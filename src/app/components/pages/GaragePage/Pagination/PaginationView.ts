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

    this.element.addEventListener(CustomEvents.UpdatePaginationState, (ev) => {
      if (ev instanceof CustomEvent) {
        // const { detail } = ev;
        // const { page, totalPages } = detail;
        // TODO implement button states
      }
    });
  }
}
