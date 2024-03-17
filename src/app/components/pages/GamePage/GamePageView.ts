import BaseComponentView from '../../BaseComponent/BaseComponentView';
import HeaderView from '../../common/Header/HeaderView';
import GameContainerView from './GameContainer/GameContainerView';
import classes from './GamePage.module.scss';

export default class GamePageView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.page,
      },
      undefined,
      new HeaderView(),
      new GameContainerView(),
    );
  }
}
