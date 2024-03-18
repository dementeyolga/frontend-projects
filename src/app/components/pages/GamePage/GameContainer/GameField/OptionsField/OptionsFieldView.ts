import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import SolutionFieldView from '../SolutionField/SolutionFieldView';
import OptionView from './Option/OptionView';
import classes from './OptionsField.module.scss';
import optionClasses from './Option/Option.module.scss';
import ContinueButtonView from '../ContinueButton/ContinueButtonView';

export default class OptionsFieldView extends BaseComponentView<HTMLDivElement> {
  private solutionField: SolutionFieldView;

  continueButton?: ContinueButtonView;

  constructor(options: string[], solutionField: SolutionFieldView) {
    super({
      tagName: 'div',
      className: classes.field,
    });

    this.solutionField = solutionField;

    this.renderOptions(options);

    this.initClickListener();
  }

  renderOptions(options: string[]) {
    this.removeChildrenComponents();

    options.forEach((option) =>
      this.addChildrenComponents('end', new OptionView(option)),
    );
  }

  private initClickListener(): void {
    this.element.addEventListener('click', async (event) => {
      const { target } = event;

      if (
        target instanceof HTMLDivElement &&
        target.classList.contains(optionClasses.option)
      ) {
        const lastSentence =
          this.solutionField.children[this.solutionField.children.length - 1];

        await lastSentence.addChildrenComponents(
          'end',
          new OptionView(target.textContent || ''),
        );

        await this.removeChildComponent(target);

        console.log(lastSentence);

        if (lastSentence.isInRightOrder()) {
          if (this.continueButton) {
            this.continueButton.getElement().disabled = false;
          }
        }
      }
    });
  }
}
