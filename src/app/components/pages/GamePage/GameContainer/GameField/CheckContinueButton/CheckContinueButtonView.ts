import { CustomEventNames } from '../../../../../../types/enums';
import { Words } from '../../../../../../types/types';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './CheckContinueButton.module.scss';

export default class CheckContinueButtonView extends ButtonView {
  private levels: Words;

  private currentLevelIndex: number = 0;

  private isContinue: boolean = false;

  constructor(levels: Words) {
    super(classes.button, 'button', 'Check', undefined, true);

    this.levels = levels;

    this.initClickListener();
  }

  transformToContinue(): void {
    if (this.element.disabled) this.element.disabled = false;
    this.setTextContent('Continue');
    this.addClass(classes.continue);
    this.isContinue = true;
  }

  private initClickListener() {
    this.element.addEventListener('click', () => {
      if (!this.isContinue) {
        this.element.dispatchEvent(
          new CustomEvent(CustomEventNames.CheckSolution, { bubbles: true }),
        );
      } else if (this.currentLevelIndex !== this.levels.length - 1) {
        this.continueToNextRound();
      } else {
        this.element.dispatchEvent(
          new CustomEvent(CustomEventNames.NextLevel, {
            bubbles: true,
          }),
        );
      }
    });
  }

  private continueToNextRound(): void {
    this.isContinue = false;
    this.setTextContent('Check');

    this.currentLevelIndex += 1;
    this.element.dispatchEvent(
      new CustomEvent(CustomEventNames.NextRound, {
        bubbles: true,
        detail: this.levels[this.currentLevelIndex],
      }),
    );

    this.element.disabled = true;
  }
}
