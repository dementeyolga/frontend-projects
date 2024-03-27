import { CustomEvents } from '../../../../types/enums';
import CarFormView from '../CarForm/CarFormView';
import classes from './UpdateCarForm.module.scss';

export default class UpdateCarFormView extends CarFormView {
  private currentCarId?: number;

  constructor() {
    super('Update a car', true, classes.updateButton);
  }

  setCurrentCarId(id: number) {
    this.currentCarId = id;
  }

  deleteCurrentCarId() {
    delete this.currentCarId;
  }

  protected override initListeners(): void {
    super.initListeners();

    this.element.addEventListener('submit', async () => {
      const car = this.getCarObjectFromInputs();

      car.id = this.currentCarId;

      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.UpdateCar, {
          bubbles: true,
          detail: { car },
        }),
      );
    });
  }
}
