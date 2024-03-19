import BaseComponentView from '../../../../../../BaseComponent/BaseComponentView';
import classes from './Sentence.module.scss';
import optionClasses from '../../OptionsField/Option/Option.module.scss';
import { CustomEventNames } from '../../../../../../../types/enums';

export default class SentenceView extends BaseComponentView<HTMLDivElement> {
  private correctSolution: string;

  constructor(correctSolution: string) {
    super({
      tagName: 'div',
      className: classes.sentence,
    });

    this.correctSolution = correctSolution;
    this.initClickListener();

    console.log(correctSolution);
  }

  isInRightOrder(): boolean {
    const solution = this.children
      .map((comp) => comp.getElement().textContent)
      .join(' ');

    return solution === this.correctSolution;
  }

  checkSentenceElements(): void {
    const solutionArr = this.correctSolution.split(' ');

    this.children.forEach((comp, index) => {
      const element = comp.getElement();

      if (element.textContent === solutionArr[index]) {
        element.classList.add(optionClasses.correct);
      } else {
        element.classList.add(optionClasses.wrong);
      }
    });
  }

  private initClickListener(): void {
    this.element.addEventListener('click', (event) => {
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
    });
  }
}
