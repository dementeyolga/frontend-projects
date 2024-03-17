import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import classes from './SolutionField.module.scss';
import optionClasses from '../OptionsField/Option/Option.module.scss';
import OptionView from '../OptionsField/Option/OptionView';

export default class SolutionFieldView extends BaseComponentView<HTMLDivElement> {
  optionsField?: BaseComponentView;

  constructor() {
    super({
      tagName: 'div',
      className: classes.field,
    });
    this.initClickListener();
  }

  initClickListener(): void {
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
