import { CustomEvents } from '../../../../../types/enums';
import { Car, EngineParameters } from '../../../../../types/types';
import {
  setCarEngineStatus,
  setCarEngineToDriveStatus,
} from '../../../../../utils/asyncRaceApi';
import getTranslateX from '../../../../../utils/getTranslateX';
import { div, p, svg } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import ImageView from '../../../../common/Image/ImageView';
import classes from './CarInfo.module.scss';
import DeleteCarButtonView from './DeleteCarButton/DeleteCarButtonView';
import SelectCarButtonView from './SelectCarButton/SelectCarButtonView';
import StartButtonView from './StartButton/StartButtonView';
import StopButtonView from './StopButton/StopButtonView';
import carSvg from './car.svg';
import finishPic from './finish.webp';

export default class CarInfoView extends BaseComponentView<HTMLDivElement> {
  id: number;

  private carSvgComp: BaseComponentView<HTMLElement & SVGElement>;

  private nameComp: BaseComponentView<HTMLParagraphElement>;

  private color: string;

  private name: string;

  private translateXShift: number = 0;

  private animationRequestID?: number;

  private startButton: StartButtonView;

  private stopButton: StopButtonView;

  constructor(carParams: Car) {
    const { id, name, color } = carParams;

    const carSvgComp = svg(
      `<svg width="100%" height="100%" 
      viewBox="0 0 100 45"><use href="${carSvg}#car"></use></svg>
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
    );

    this.startButton = new StartButtonView();
    this.stopButton = new StopButtonView();

    this.addChildrenComponents(
      'end',
      div(classes.buttons, this.startButton, this.stopButton),
      carSvgComp,
      div(classes.road),
      new ImageView(finishPic, 'finish', classes.finish),
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

  async startCar(): Promise<EngineParameters | null> {
    return setCarEngineStatus(this.id, 'started');
  }

  async driveCar(
    engineParams: EngineParameters,
  ): Promise<{ car: Car; engineParams: EngineParameters }> {
    console.log(
      `car ${[engineParams.distance, engineParams.velocity]} started successfully`,
    );

    this.startButton.disable();
    this.stopButton.enable();

    const framesCount =
      (engineParams.distance / engineParams.velocity / 1000) * 60;

    this.translateXShift =
      (this.getElementWidth() - this.carSvgComp.getElementWidth()) /
      framesCount;

    this.animationRequestID = requestAnimationFrame(
      this.animateCarMovement.bind(this),
    );

    const before = Date.now();

    const driveStatus = await setCarEngineToDriveStatus(this.id);

    cancelAnimationFrame(this.animationRequestID);

    if (!driveStatus.success) throw Error('car got broken');

    console.log(
      this.getCarInfo(),
      'drive status returned',
      driveStatus,
      'actual ride time: ',
      Date.now() - before,
      'counted time: ',
      engineParams.distance / engineParams.velocity,
    );

    const carInfo = this.getCarInfo();

    return {
      car: carInfo,
      engineParams,
    };
  }

  async animateCarMovement(): Promise<void> {
    const currentTranslateX = getTranslateX(this.carSvgComp.getElement());
    this.carSvgComp.getElement().style.transform = `translateX(${currentTranslateX + this.translateXShift}px)`;

    this.animationRequestID = requestAnimationFrame(
      this.animateCarMovement.bind(this),
    );
  }

  async stopCar(): Promise<void> {
    this.stopButton.disable();
    await setCarEngineStatus(this.id, 'stopped');

    if (this.animationRequestID) {
      cancelAnimationFrame(this.animationRequestID);
    }

    this.carSvgComp.getElement().style.transform = 'translateX(0)';
    this.startButton.enable();
  }

  private initListeners(): void {
    this.initTriggerUpdateCarInfoListener();
    this.initTriggerDeleteCarListener();
    this.initTriggerStartCarListener();
    this.initTriggerStopCarListener();
  }

  private initTriggerUpdateCarInfoListener(): void {
    this.element.addEventListener(CustomEvents.TriggerUpdateCarInfo, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.FocusUpdateCarInput, {
          bubbles: true,
          detail: { car: this.getCarInfo() },
        }),
      );
    });
  }

  private initTriggerDeleteCarListener(): void {
    this.element.addEventListener(CustomEvents.TriggerDeleteCar, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.DeleteCar, {
          bubbles: true,
          detail: { car: this.getCarInfo() },
        }),
      );
    });
  }

  private initTriggerStartCarListener(): void {
    this.element.addEventListener(CustomEvents.StartCar, async () => {
      const engineParams = await this.startCar();

      if (engineParams) {
        this.driveCar(engineParams);
      }
    });
  }

  private initTriggerStopCarListener(): void {
    this.element.addEventListener(CustomEvents.StopCar, async () => {
      await this.stopCar();
    });
  }
}
