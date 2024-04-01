import { CustomEvents } from '../../../../types/enums';
import ButtonView from '../../../common/Button/ButtonView';
import classes from './StopRaceButton.module.scss';

export default class StopRaceButtonView extends ButtonView {
  constructor() {
    super(classes.button, 'button', 'Stop race', undefined, true);

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.StopRace, { bubbles: true }),
      );
    });
  }
}
