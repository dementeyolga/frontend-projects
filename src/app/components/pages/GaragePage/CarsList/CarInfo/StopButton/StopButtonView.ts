import { CustomEvents } from '../../../../../../types/enums';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './StopButton.module.scss';

export default class StopButtonView extends ButtonView {
  constructor() {
    super(classes.button, 'button', 'Stop', undefined, true);

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.StopCar, { bubbles: true }),
      );
    });
  }
}
