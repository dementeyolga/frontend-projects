import { getCars } from '../../../../utils/asyncRaceApi';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import CarInfoView from './CarInfo/CarInfoView';
import classes from './CarsList.module.scss';

export default class CarsListView extends BaseComponentView<HTMLDivElement> {
  declare children: CarInfoView[];

  constructor() {
    super({ tagName: 'div', className: classes.list });

    this.updateChildren();
  }

  async updateChildren() {
    this.removeChildrenComponents();
    const cars = await getCars();

    const childrenComponents: CarInfoView[] = [];
    if (cars) {
      cars.forEach((car) => childrenComponents.push(new CarInfoView(car)));
    }

    this.addChildrenComponents('end', ...childrenComponents);
  }

  findChildComponentById(id: number): CarInfoView | undefined {
    const component = this.children.find((comp) => comp.id === id);

    return component;
  }
}
