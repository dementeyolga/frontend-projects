import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import SolutionFieldView from '../SolutionField/SolutionFieldView';
import OptionView from './Option/OptionView';
import classes from './OptionsField.module.scss';
import optionClasses from './Option/Option.module.scss';

export default class OptionsFieldView extends BaseComponentView<HTMLDivElement> {
  private solutionField: SolutionFieldView;

  constructor(options: string[], solutionField: SolutionFieldView) {
    super(
      {
        tagName: 'div',
        className: classes.field,
      },
      undefined,
    );

    this.solutionField = solutionField;

    options.forEach((option) =>
      this.addChildrenComponents('end', new OptionView(option)),
    );

    this.initClickListener();
  }

  initClickListener(): void {
    this.element.addEventListener('click', (event) => {
      const { target } = event;

      if (
        target instanceof HTMLDivElement &&
        target.classList.contains(optionClasses.option)
      ) {
        this.solutionField.addChildrenComponents(
          'end',
          new OptionView(target.textContent || ''),
        );

        this.removeChildComponent(target);
      }
    });
  }
}
