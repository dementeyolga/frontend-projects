import { CustomEvents } from '../../../../../types/enums';
import { Car } from '../../../../../types/types';
import { div, p, svg } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './CarInfo.module.scss';
import DeleteCarButtonView from './DeleteCarButton/DeleteCarButtonView';
import SelectCarButtonView from './SelectCarButton/SelectCarButtonView';
import carSvg from './car.svg';

export default class CarInfoView extends BaseComponentView<HTMLDivElement> {
  id: number;

  private carSvgComp: BaseComponentView<HTMLElement & SVGElement>;

  private nameComp: BaseComponentView<HTMLParagraphElement>;

  private color: string;

  private name: string;

  constructor(carParams: Car) {
    const { id, name, color } = carParams;

    const carSvgComp = svg(
      `<svg><use href="./${carSvg}#car"></use></svg>
      `,
      classes.svg,
    );

    const nameComp = p(name || 'No Name', classes.carName);

    super(
      { tagName: 'div', className: classes.info },
      nameComp,
      div(
        classes.buttons,
        new SelectCarButtonView(),
        new DeleteCarButtonView(),
      ),
      carSvgComp,
    );

    this.id = id;
    this.color = color;
    this.name = name;
    this.carSvgComp = carSvgComp;
    this.nameComp = nameComp;
    this.setCarColor(color);
    this.initListeners();
  }

  setCarColor(color: string): void {
    this.carSvgComp.getElement().style.fill = color;
    this.color = color;
  }

  setCarName(name: string): void {
    this.nameComp.setTextContent(name);
    this.name = name;
  }

  getCarInfo(): Car {
    return {
      id: this.id,
      color: this.color,
      name: this.name,
    };
  }

  setCarInfo(carInfo: Car) {
    const { color, name } = carInfo;
    this.setCarColor(color);
    this.setCarName(name);
  }

  private initListeners(): void {
    this.initTriggerUpdateCarInfo();
    this.initTriggerDeleteCar();
  }

  private initTriggerUpdateCarInfo(): void {
    this.element.addEventListener(CustomEvents.TriggerUpdateCarInfo, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.FocusUpdateCarInput, {
          bubbles: true,
          detail: { car: this.getCarInfo() },
        }),
      );
    });
  }

  private initTriggerDeleteCar(): void {
    this.element.addEventListener(CustomEvents.TriggerDeleteCar, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.DeleteCar, {
          bubbles: true,
          detail: { car: this.getCarInfo() },
        }),
      );
    });
  }
}
