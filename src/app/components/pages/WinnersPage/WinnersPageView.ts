import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { h1 } from '../../../utils/tagViews';
// import classes from './WinnersPage.module.scss';
import HeaderView from '../../common/Header/HeaderView';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: 'page',
      },
      new HeaderView(),
      h1('h1', 'Winners'),
    );
  }
}
