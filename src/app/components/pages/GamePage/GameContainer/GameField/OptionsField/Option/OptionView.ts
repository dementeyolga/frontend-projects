import BaseComponentView from '../../../../../../BaseComponent/BaseComponentView';
import classes from './Option.module.scss';
import gameFieldClasses from '../../GameField.module.scss';
import { CustomEventNames } from '../../../../../../../types/enums';

export default class OptionView extends BaseComponentView<HTMLDivElement> {
  private shiftX?: number;

  private shiftY?: number;

  private clone?: HTMLElement | null;

  constructor(textContent: string, sentence: string) {
    super({
      tagName: 'div',
      className: classes.option,
      textContent,
    });

    this.initDragEvent();

    const solutionLettersQuantity = sentence.split(' ').join('').length;
    this.element.style.width = `${(textContent.length / solutionLettersQuantity) * 100}%`;
  }

  private initDragEvent(): void {
    this.element.addEventListener('mousedown', (event) => {
      this.element.ondragstart = () => false;

      this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

      this.createElementClone();
      this.moveCloneAt(event.pageX, event.pageY);

      const initialDroppable = this.getDroppableUnderClone(event);
      const initialOption = this.getOptionUnderClone(event);

      const onPointerMove = (ev: MouseEvent) => {
        this.moveCloneAt(ev.pageX, ev.pageY);
      };

      document.addEventListener('pointermove', onPointerMove);

      document.onpointerup = (ev) => {
        document.removeEventListener('pointermove', onPointerMove);
        this.drop(ev, initialDroppable, initialOption);
        document.onpointerup = null;
      };
    });
  }

  private createElementClone(): void {
    this.clone = this.element.cloneNode(true) as HTMLElement;
    this.clone.classList.add(classes.clone);
    this.clone.style.position = 'absolute';
    this.clone.style.zIndex = '1000';
    document.body.append(this.clone);
  }

  private moveCloneAt(pageX: number, pageY: number): void {
    if (this.clone) {
      const elSizes = this.clone.getBoundingClientRect();

      if (
        pageX <= 0 + (this.shiftX ?? 0) ||
        pageY <= 0 + (this.shiftY ?? 0) ||
        pageX >=
          document.documentElement.clientWidth -
            elSizes.width +
            (this.shiftX ?? 0) ||
        pageY >=
          document.documentElement.clientHeight -
            elSizes.height +
            (this.shiftY ?? 0)
      ) {
        return;
      }

      if (this.clone instanceof HTMLElement && this.shiftX && this.shiftY) {
        this.clone.style.left = `${pageX - this.shiftX}px`;
        this.clone.style.top = `${pageY - this.shiftY}px`;
      }
    }
  }

  private getDroppableUnderClone(ev: MouseEvent): HTMLElement | null {
    if (this.clone instanceof HTMLElement) {
      this.clone.style.display = 'none';
      const elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);
      this.clone.style.display = 'flex';

      if (!elemBelow) return null;

      const droppableBelow = elemBelow.closest(
        `.${gameFieldClasses.droppable}`,
      );
      if (droppableBelow instanceof HTMLElement) {
        return droppableBelow;
      }
    }

    return null;
  }

  private getOptionUnderClone(ev: MouseEvent): HTMLElement | null {
    if (this.clone instanceof HTMLElement) {
      this.clone.style.display = 'none';
      const elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);
      this.clone.style.display = 'flex';

      if (!elemBelow) return null;

      const optionBelow = elemBelow.closest(`.${classes.option}`);

      if (optionBelow instanceof HTMLElement) {
        return optionBelow;
      }
    }

    return null;
  }

  private drop(
    ev: MouseEvent,
    initialDroppable: HTMLElement | null,
    initialOption: HTMLElement | null,
  ) {
    if (this.clone instanceof HTMLElement) {
      const droppableBelow = this.getDroppableUnderClone(ev);
      const optionBelow = this.getOptionUnderClone(ev);

      this.clone.remove();
      this.clone = null;

      if (initialOption === optionBelow) {
        this.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        return;
      }

      if (initialDroppable === droppableBelow && droppableBelow) {
        this.dropToTheSameDroppaple(ev, droppableBelow, optionBelow);

        return;
      }

      if (droppableBelow) {
        this.dropToNewDroppable(droppableBelow);
      }
    }
  }

  private dropToTheSameDroppaple(
    ev: MouseEvent,
    droppableBelow: HTMLElement,
    optionBelow: HTMLElement | null,
  ): void {
    this.element.dispatchEvent(
      new CustomEvent(CustomEventNames.OptionsDefaultStyle, {
        bubbles: true,
      }),
    );

    if (optionBelow) {
      const coords = optionBelow.getBoundingClientRect();

      if (coords.right - ev.clientX < ev.clientX - coords.left) {
        optionBelow.after(this.element);
      } else {
        optionBelow.before(this.element);
      }
    } else {
      const coords = droppableBelow.getBoundingClientRect();

      if (coords.right - ev.clientX < ev.clientX - coords.left) {
        droppableBelow.append(this.element);
      } else {
        droppableBelow.prepend(this.element);
      }
    }
  }

  private dropToNewDroppable(droppableBelow: HTMLElement): void {
    this.element.dispatchEvent(
      new CustomEvent(CustomEventNames.DropOption, {
        bubbles: true,
        detail: droppableBelow,
      }),
    );
  }
}
