import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { div, h1, main } from '../../../utils/tagViews';
import classes from './GaragePage.module.scss';
import HeaderView from '../../common/Header/HeaderView';
import NewCarFormView from './NewCarForm/NewCarFormView';
import UpdateCarFormView from './UpdateCarForm/UpdateCarFormView';
import CarsListView from './CarsList/CarsListView';
import { CustomEvents } from '../../../types/enums';
import { createCar, deleteCar, updateCar } from '../../../utils/asyncRaceApi';
import CarInfoView from './CarsList/CarInfo/CarInfoView';
import RaceButtonView from './RaceButton/RaceButtonView';
import StopRaceButtonView from './StopRaceButton/StopRaceButtonView';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  private carsList: CarsListView;

  private updateCarFormView: UpdateCarFormView;

  private raceButton: RaceButtonView;

  private stopRaceButton: StopRaceButtonView;

  constructor() {
    super(
      {
        tagName: 'div',
        className: 'page',
      },
      new HeaderView(),
    );

    this.updateCarFormView = new UpdateCarFormView();
    this.raceButton = new RaceButtonView();
    this.stopRaceButton = new StopRaceButtonView();

    const mainBlock = main(
      classes.main,
      h1('h1', 'Garage'),
      div(
        classes.carForm,
        new NewCarFormView(),
        this.updateCarFormView,
        div(classes.buttons, this.raceButton, this.stopRaceButton),
      ),
    );

    this.carsList = new CarsListView();
    mainBlock.addChildrenComponents('end', this.carsList);
    this.addChildrenComponents('end', mainBlock);

    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.initCreateCarListener();
    this.initFocusUpdateCarInputListener();
    this.initUpdateCarListener();
    this.initDeleteCarListener();
  }

  private initCreateCarListener() {
    this.element.addEventListener(CustomEvents.CreateCar, async (ev) => {
      if (ev instanceof CustomEvent) {
        const { car } = ev.detail;
        const newCar = await createCar(car);
        console.log('new car', newCar);

        if (newCar) {
          this.carsList.addChildrenComponents('end', new CarInfoView(newCar));
        }
      }
    });
  }

  private initFocusUpdateCarInputListener(): void {
    this.element.addEventListener(CustomEvents.FocusUpdateCarInput, (ev) => {
      if (ev instanceof CustomEvent) {
        const { detail } = ev;
        const { id, name, color } = detail.car;

        this.updateCarFormView.enableForm();
        this.updateCarFormView.setCurrentCarId(id);

        const [nameInput, colorInput] = this.updateCarFormView.inputs;

        nameInput.focus();
        nameInput.setInputValue(name);
        colorInput.setInputValue(color);
      }
    });
  }

  private initUpdateCarListener() {
    this.element.addEventListener(CustomEvents.UpdateCar, async (ev) => {
      if (ev instanceof CustomEvent) {
        const { car } = ev.detail;
        const updatedCarInfo = await updateCar(car);

        if (updatedCarInfo) {
          const carComp = this.carsList.findChildComponentById(car.id);

          if (carComp) {
            carComp.setCarInfo(updatedCarInfo);
          }
        }

        this.updateCarFormView.disableForm();
      }
    });
  }

  private initDeleteCarListener(): void {
    this.element.addEventListener(CustomEvents.DeleteCar, async (ev) => {
      if (ev instanceof CustomEvent) {
        const { car } = ev.detail;
        await deleteCar(car.id);

        this.carsList.removeChildComponent(car.id);
      }
    });
  }
}
