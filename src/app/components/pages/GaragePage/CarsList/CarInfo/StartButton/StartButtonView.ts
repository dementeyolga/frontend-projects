import { CustomEvents } from '../../../../../../types/enums';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './StartButton.module.scss';

export default class StartButtonView extends ButtonView {
  constructor() {
    super(classes.button, 'button', 'Start');

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.StartCar, { bubbles: true }),
      );
    });
  }
}
