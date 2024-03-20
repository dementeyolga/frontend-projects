import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import OptionView from './Option/OptionView';
import ContinueButtonView from '../CheckContinueButton/CheckContinueButtonView';
import { CustomEventNames } from '../../../../../../types/enums';
import classes from './OptionsField.module.scss';
import gameFieldClasses from '../GameField.module.scss';
import optionClasses from './Option/Option.module.scss';

export default class OptionsFieldView extends BaseComponentView<HTMLDivElement> {
  checkContinueButton?: ContinueButtonView;

  constructor(options: string[]) {
    super({
      tagName: 'div',
      className: `${classes.field} ${gameFieldClasses.droppable}`,
    });

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

      console.log('target', target);

      if (
        target instanceof HTMLDivElement &&
        target.classList.contains(optionClasses.option)
      ) {
        target.dispatchEvent(
          new CustomEvent(CustomEventNames.MoveOption, {
            bubbles: true,
            detail: { source: this },
          }),
        );

        await this.removeChildComponent(target);

        if (this.children.length === 0) {
          this.element.dispatchEvent(
            new CustomEvent(CustomEventNames.EnableCheckButton, {
              bubbles: true,
            }),
          );
        }
      }
    });
  }
}
