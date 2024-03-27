import { CustomEvents } from '../../../../../../types/enums';
import ButtonView from '../../../../../common/Button/ButtonView';

export default class DeleteCarButtonView extends ButtonView {
  constructor() {
    super('', 'button', 'Delete');

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.TriggerDeleteCar, { bubbles: true }),
      );
    });
  }
}
