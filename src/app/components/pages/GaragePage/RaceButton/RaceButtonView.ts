import { CustomEvents } from '../../../../types/enums';
import ButtonView from '../../../common/Button/ButtonView';
import classes from './RaceButton.module.scss';

export default class RaceButtonView extends ButtonView {
  constructor() {
    super(classes.button, 'button', 'Race');

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.StartRace, { bubbles: true }),
      );
    });
  }
}
