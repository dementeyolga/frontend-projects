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
  deleteCar,
  getCars,
  LIMIT_PER_PAGE,
  updateCar,
} from '../../../utils/asyncRaceApi';
import PaginationView from './Pagination/PaginationView';
import RaceButtonView from './RaceButton/RaceButtonView';
import StopRaceButtonView from './StopRaceButton/StopRaceButtonView';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  private carsList: CarsListView;

  private updateCarFormView: UpdateCarFormView;

  private raceButton: RaceButtonView;

  private stopRaceButton: StopRaceButtonView;

  private createCarFormView: NewCarFormView;

  private carQuantityComp: BaseComponentView<HTMLParagraphElement>;

  // private totalCarsQuantity: number = 0;

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
  }

  private async updateCarQuantity(): Promise<void> {
    const quantity = await GaragePageView.getTotalCarsQuantity();

    // this.totalCarsQuantity = quantity;
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

      this.updateCarQuantity();
      this.updatePagesInfo();
    });
  }

  private initNextPageListener(): void {
    this.element.addEventListener(CustomEvents.NextPage, () => {
      this.currentPage += 1;
      this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);

      this.pagination.getElement().dispatchEvent(
        new CustomEvent(CustomEvents.UpdatePaginationState, {
          detail: { page: this.currentPage, totalPages: this.totalPages },
        }),
      );
    });
  }

  private initPrevPageListener(): void {
    this.element.addEventListener(CustomEvents.PrevPage, () => {
      this.currentPage -= 1;
      this.carsList.updateChildren(this.currentPage, LIMIT_PER_PAGE);
    });
  }
}
