import BaseComponentView from '../../../../../../BaseComponent/BaseComponentView';
import classes from './Sentence.module.scss';
import optionClasses from '../../OptionsField/Option/Option.module.scss';
import { CustomEventNames } from '../../../../../../../types/enums';
import gameFieldClasses from '../../GameField.module.scss';

export default class SentenceView extends BaseComponentView<HTMLDivElement> {
  correctSolution: string;

  private solutionArr: string[];

  constructor(correctSolution: string) {
    super({
      tagName: 'div',
      className: `${classes.sentence} ${gameFieldClasses.droppable}`,
    });

    this.correctSolution = correctSolution;
    this.solutionArr = this.correctSolution.split(' ');
    this.initClickListener();

    console.log(correctSolution);
  }

  isInRightOrder(): boolean {
    const solution = [...this.element.children]
      .map((element) => element.textContent)
      .join(' ');

    return solution === this.correctSolution;
  }

  checkSentenceElements(): void {
    [...this.element.children].forEach((element, index) => {
      if (element.textContent === this.solutionArr[index]) {
        element.classList.add(optionClasses.correct);
      } else {
        element.classList.add(optionClasses.wrong);
      }
    });
  }

  showCorrectOrder(): void {
    this.solutionArr.forEach((word, index) => {
      const currentWordComponent = this.children.find(
        (comp) => comp.getElement().textContent === word,
      );

      if (currentWordComponent) {
        const el = currentWordComponent.getElement();
        el.style.order = String(index);
      }
    });
  }

  private initClickListener(): void {
    this.element.onclick = (event) => {
      const { target } = event;

      if (
        target instanceof HTMLDivElement &&
        target.classList.contains(optionClasses.option)
      ) {
        this.children.forEach((comp) => {
          comp.removeClass(optionClasses.correct);
          comp.removeClass(optionClasses.wrong);
        });

        target.dispatchEvent(
          new CustomEvent(CustomEventNames.MoveOption, {
            bubbles: true,
            detail: { source: this },
          }),
        );

        this.removeChildComponent(target);
      }
    };
  }
}
