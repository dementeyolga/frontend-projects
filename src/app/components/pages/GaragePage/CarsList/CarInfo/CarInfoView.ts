import { Car } from '../../../../../types/types';
import { p, svg } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './CarInfo.module.scss';
import carSvg from './car.svg';

export default class CarInfoView extends BaseComponentView<HTMLDivElement> {
  constructor(carParams: Car) {
    const carSvgComp = svg(
      `<svg><use href="./${carSvg}#car"></use></svg>
      `,
      classes.svg,
    );
    carSvgComp.getElement().style.fill = carParams.color;

    super(
      { tagName: 'div', className: classes.info },
      p(carParams.name || 'No Name', classes.carName),
      carSvgComp,
    );
  }
}
