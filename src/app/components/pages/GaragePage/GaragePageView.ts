import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { div, h1, main, p } from '../../../utils/tagViews';
import classes from './GaragePage.module.scss';
import HeaderView from '../../common/Header/HeaderView';
import NewCarFormView from './NewCarForm/NewCarFormView';
import UpdateCarFormView from './UpdateCarForm/UpdateCarFormView';
import CarsListView from './CarsList/CarsListView';
import { CustomEvents } from '../../../types/enums';
import {
  createCar,
  createWinner,
  deleteCar,
  getCars,
  getWinner,
  getWinners,
  LIMIT_PER_PAGE,
  updateCar,
  updateWinner,
} from '../../../utils/asyncRaceApi';
import PaginationView from './Pagination/PaginationView';
import RaceButtonView from './RaceButton/RaceButtonView';
import StopRaceButtonView from './StopRaceButton/StopRaceButtonView';
import { Car } from '../../../types/types';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  private carsList: CarsListView;

  private updateCarFormView: UpdateCarFormView;

  private raceButton: RaceButtonView;

  private stopRaceButton: StopRaceButtonView;

  private createCarFormView: NewCarFormView;

  private carQuantityComp: BaseComponentView<HTMLParagraphElement>;

  private currentPage: number = 1;

  private pageInfoComp: BaseComponentView<HTMLParagraphElement>;

  private pagination: PaginationView;

  private totalPages?: number;

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
    this.createCarFormView = new NewCarFormView();

    this.carQuantityComp = p('', classes.carQuantity);
    this.pageInfoComp = p('', classes.pageInfo);

    const mainBlock = main(
      classes.main,
      h1('h1', 'Garage'),
      div(
        classes.carForm,
        this.createCarFormView,
        this.updateCarFormView,
        div(classes.buttons, this.raceButton, this.stopRaceButton),
      ),
      this.carQuantityComp,
      this.pageInfoComp,
    );

    this.carsList = new CarsListView(1);
    this.pagination = new PaginationView();

    mainBlock.addChildrenComponents('end', this.carsList, this.pagination);
    this.addChildrenComponents('end', mainBlock);

    this.updateCarQuantity();
    this.updatePagesInfo();

    this.initEventListeners();
  }

  private async updatePagesInfo() {
    const pages = await GaragePageView.getPagesQuantity();

    this.totalPages = pages;

    this.pageInfoComp.setTextContent(`Page #${this.currentPage} / ${pages}`);

    this.pagination.setButtonStates(this.currentPage, this.totalPages);
  }

  private async updateCarQuantity(): Promise<void> {
    const quantity = await GaragePageView.getTotalCarsQuantity();

    this.carQuantityComp.setTextContent(
      `Total cars in the Garage: ${quantity}`,
    );
  }

  private static async getTotalCarsQuantity(): Promise<number> {
    const cars = await getCars();

    if (cars) {
      return cars.length;
    }

    return 0;
  }

  private static async getPagesQuantity(): Promise<number> {
    const totalCars = await GaragePageView.getTotalCarsQuantity();

    return Math.ceil(totalCars / LIMIT_PER_PAGE);
  }

  private initEventListeners(): void {
    this.initCreateCarListener();
    this.initFocusUpdateCarInputListener();
    this.initUpdateCarListener();
    this.initDeleteCarListener();
    this.initStartRaceListener();
    this.initStopRaceListener();
    this.initNextPageListener();
    this.initPrevPageListener();
  }

  private initCreateCarListener() {
    this.element.addEventListener(CustomEvents.CreateCar, async (ev) => {
      if (ev instanceof CustomEvent) {
        const { car } = ev.detail;
        const newCar = await createCar(car);
        console.log('new car', newCar);

        this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);

        this.createCarFormView.resetInputs();

        this.updateCarQuantity();
        this.updatePagesInfo();
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
        const typedCar = car as Car;

        const updatedCarInfo = await updateCar(typedCar);

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

      this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);

      this.updateCarQuantity();
      this.updatePagesInfo();
    });
  }

  private initStartRaceListener(): void {
    this.element.addEventListener(CustomEvents.StartRace, async () => {
      try {
        this.raceButton.disable();

        const startPromises = this.carsList.children.map((child) =>
          child.startCar(),
        );

        const enginePromises = await Promise.allSettled(startPromises);

        this.stopRaceButton.enable();

        const drivePromises = enginePromises.map((promise, id) => {
          if (promise.status === 'fulfilled') {
            if (promise.value) {
              return this.carsList.children[id].driveCar(promise.value);
            }
          }

          return Promise.reject();
        });

        const { car: winner, engineParams } = await Promise.any(drivePromises);
        const { id: newWinnerId } = winner;
        const raceTime =
          Math.round(engineParams.distance / engineParams.velocity / 10) / 100;

        const existingWinner = await getWinner(newWinnerId);
        console.log('winner', winner, 'existing winner', existingWinner);

        if (existingWinner && existingWinner.id) {
          const { id, wins, time } = existingWinner;
          const newWins = wins + 1;

          console.log(newWins);

          await updateWinner(id, newWins, time > raceTime ? raceTime : time);
          console.log(await getWinners());
        } else {
          await createWinner({ id: newWinnerId, time: raceTime, wins: 1 });
        }
      } catch {
        console.error('Error occured at the race');
      }
    });
  }

  private initStopRaceListener(): void {
    this.element.addEventListener(CustomEvents.StopRace, async () => {
      this.stopRaceButton.disable();
      const stopPromises = this.carsList.children.map((car) => car.stopCar());
      await Promise.allSettled(stopPromises);
      this.raceButton.enable();
    });
  }

  private initNextPageListener(): void {
    this.element.addEventListener(CustomEvents.NextPage, () => {
      this.currentPage += 1;
      this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);
      this.updatePagesInfo();
    });
  }

  private initPrevPageListener(): void {
    this.element.addEventListener(CustomEvents.PrevPage, () => {
      this.currentPage -= 1;
      this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);
      this.updatePagesInfo();
    });
  }
}
