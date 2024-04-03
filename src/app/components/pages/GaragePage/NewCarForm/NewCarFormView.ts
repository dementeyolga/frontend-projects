import { CustomEvents } from '../../../../types/enums';
import { getCars } from '../../../../utils/asyncRaceApi';
import CarFormView from '../CarForm/CarFormView';

export default class NewCarFormView extends CarFormView {
  constructor() {
    super('Create a car');
  }

  protected override initListeners(): void {
    super.initListeners();

    this.element.addEventListener('submit', async () => {
      const car = this.getCarObjectFromInputs();

      const cars = await getCars();
      let id = 1;

      if (cars && cars.length) {
        const lastCarId = cars[cars.length - 1].id;
        id = lastCarId + 1;
      }

      car.id = id;

      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.CreateCar, {
          bubbles: true,
          detail: { car },
        }),
      );
    });
  }
}
