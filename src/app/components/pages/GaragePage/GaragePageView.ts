import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { div, h1, main } from '../../../utils/tagViews';
import classes from './GaragePage.module.scss';
import HeaderView from '../../common/Header/HeaderView';
import NewCarFormView from './NewCarForm/NewCarFormView';
import UpdateCarFormView from './UpdateCarForm/UpdateCarFormView';
import CarsListView from './CarsList/CarsListView';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: 'page',
      },
      new HeaderView(),
      main(
        classes.main,
        h1('h1', 'Garage'),
        div(classes.carForm, new NewCarFormView(), new UpdateCarFormView()),
        new CarsListView(),
      ),
    );
  }
}
