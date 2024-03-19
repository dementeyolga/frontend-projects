import { CustomEventNames } from '../../../../../../types/enums';
import { Words } from '../../../../../../types/types';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './CheckContinueButton.module.scss';

export default class CheckContinueButtonView extends ButtonView {
  private levels: Words;

  private currentLevelIndex: number = 0;

  constructor(levels: Words) {
    super(classes.button, 'button', 'Check', undefined, true);

    this.levels = levels;

    this.initClickListener();
  }

  private initClickListener() {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEventNames.CheckSolution, { bubbles: true }),
      );
      // Continue button functions
      // if (this.currentLevelIndex !== this.levels.length - 1) {
      //   this.currentLevelIndex += 1;
      //   outerCallback(this.levels[this.currentLevelIndex]);
      //   this.element.disabled = true;
      // } else {
      //   this.element.dispatchEvent(
      //     new CustomEvent('next-level', {
      //       bubbles: true,
      //     }),
      //   );
      // }
    });
  }
}
