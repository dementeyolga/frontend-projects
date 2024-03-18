import { Word, Words } from '../../../../../../types/types';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './ContinueButton.module.scss';

export default class ContinueButtonView extends ButtonView {
  private levels: Words;

  private currentLevelIndex: number = 0;

  constructor(levels: Words, outerCallback: (level: Word) => void) {
    super(classes.button, 'button', 'Continue', undefined, true);

    this.levels = levels;

    this.initClickListener(outerCallback);
  }

  private initClickListener(outerCallback: (level: Word) => void) {
    this.element.addEventListener('click', () => {
      if (this.currentLevelIndex !== this.levels.length - 1) {
        this.currentLevelIndex += 1;

        outerCallback(this.levels[this.currentLevelIndex]);

        this.element.disabled = true;
      } else {
        this.element.dispatchEvent(
          new CustomEvent('next-level', {
            bubbles: true,
          }),
        );
      }
    });
  }
}
