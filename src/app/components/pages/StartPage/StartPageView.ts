import BaseComponentView from '../../BaseComponent/BaseComponentView';
import HeaderView from '../../common/Header/HeaderView';
import classes from './StartPage.module.scss';

export default class StartPageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.page,
      },
      undefined,
      new HeaderView(),
    );
  }
}
