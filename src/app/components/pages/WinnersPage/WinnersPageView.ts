import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { h1 } from '../../../utils/tagViews';
import classes from './WinnersPage.module.scss';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.page,
      },
      undefined,
      h1('h1', 'Winners'),
    );
  }
}
