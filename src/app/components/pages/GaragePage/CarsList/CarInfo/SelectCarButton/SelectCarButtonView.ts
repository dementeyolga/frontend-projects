import { CustomEvents } from '../../../../../../types/enums';
import ButtonView from '../../../../../common/Button/ButtonView';

export default class SelectCarButtonView extends ButtonView {
  constructor() {
    super('', 'button', 'Select');

    this.initListeners();
  }

  private initListeners(): void {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.TriggerUpdateCarInfo, { bubbles: true }),
      );
    });
  }
}
