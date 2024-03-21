import { CustomEventNames } from '../../../../types/enums';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import classes from './GameContainer.module.scss';
import GameFieldView from './GameField/GameFieldView';

const levels = [
  import('../../../../resources/data/wordCollectionLevel1'),
  import('../../../../resources/data/wordCollectionLevel2'),
  import('../../../../resources/data/wordCollectionLevel3'),
  import('../../../../resources/data/wordCollectionLevel4'),
  import('../../../../resources/data/wordCollectionLevel5'),
  import('../../../../resources/data/wordCollectionLevel6'),
];

export default class GameContainerView extends BaseComponentView<HTMLDivElement> {
  private currentLevel: number;

  constructor() {
    super(
      {
        tagName: 'div',
        className: classes.container,
      },
      undefined,
    );

    this.currentLevel = 0;

    this.returnRound(this.currentLevel).then((round) =>
      this.addChildrenComponents('end', new GameFieldView(round.rounds[0])),
    );

    this.initListeners();
  }

  private initListeners(): void {
    this.initNextLevelListener();
  }

  private initNextLevelListener(): void {
    this.element.addEventListener(CustomEventNames.NextLevel, () => {
      if (this.currentLevel < levels.length) {
        this.removeChildrenComponents();
        this.currentLevel += 1;
        this.returnRound(this.currentLevel).then((round) =>
          this.addChildrenComponents('end', new GameFieldView(round.rounds[0])),
        );
      }
    });
  }

  async returnRound(index: number) {
    this.addChild(document.createElement('div'));
    const { default: level } = await levels[index];

    return level;
  }
}
