import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import classes from './GameContainer.module.scss';
import GameFieldView from './GameField/GameFieldView';
import gameData from '../../../../resources/data/wordCollectionLevel1';

export default class GameContainerView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.container,
      },
      undefined,
      new GameFieldView(gameData.rounds[0]),
    );
  }
}
