import { CusomEvents } from '../../../../types/enums';
import CarFormView from '../CarForm/CarFormView';
// import classes from './NewCarForm.module.scss';

export default class NewCarFormView extends CarFormView {
  constructor() {
    super('Create a car');
  }

  protected override initListeners(): void {
    super.initListeners();

    this.element.addEventListener('submit', () => {
      const car = this.inputs.map((input) => ({
        [input.getInputType()]: input.getInputValue(),
      }));

      this.element.dispatchEvent(
        new CustomEvent(CusomEvents.CreateCar, {
          bubbles: true,
          detail: { car },
        }),
      );
    });
  }
}
