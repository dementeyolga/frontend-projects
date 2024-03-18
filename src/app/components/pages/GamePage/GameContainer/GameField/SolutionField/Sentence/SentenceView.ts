import BaseComponentView from '../../../../../../BaseComponent/BaseComponentView';
import classes from './Sentence.module.scss';
import optionClasses from '../../OptionsField/Option/Option.module.scss';
import OptionView from '../../OptionsField/Option/OptionView';

export default class SentenceView extends BaseComponentView<HTMLDivElement> {
  optionsField?: BaseComponentView;

  private correctSolution: string;

  constructor(correctSolution: string) {
    super({
      tagName: 'div',
      className: classes.sentence,
    });

    this.correctSolution = correctSolution;
    this.initClickListener();
  }

  isInRightOrder(): boolean {
    const solution = this.children
      .map((comp) => comp.getElement().textContent)
      .join(' ');

    return solution === this.correctSolution;
  }

  private initClickListener(): void {
    this.element.addEventListener('click', (event) => {
      const { target } = event;

      if (
        target instanceof HTMLDivElement &&
        target.classList.contains(optionClasses.option) &&
        this.optionsField
      ) {
        this.optionsField.addChildrenComponents(
          'end',
          new OptionView(target.textContent || ''),
        );

        this.removeChildComponent(target);
      }
    });
  }
}
