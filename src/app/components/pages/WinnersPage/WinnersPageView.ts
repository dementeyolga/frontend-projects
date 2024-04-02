import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { h1, table, td, tr } from '../../../utils/tagViews';
import HeaderView from '../../common/Header/HeaderView';
import { getWinners } from '../../../utils/asyncRaceApi';
import classes from './WinnersPage.module.scss';

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

    this.displayWinners();
  }

  async displayWinners(): Promise<void> {
    const winners = await getWinners();
    console.log(winners);

    const winnersTable = table('');

    if (winners) {
      winnersTable.addChildrenComponents(
        'end',
        tr(classes.row, td('ID'), td('Time'), td('Wins')),
      );

      winners.forEach((winner) => {
        const { id, time, wins } = winner;
        winnersTable.addChildrenComponents(
          'end',
          tr(classes.row, td(String(id)), td(`${time} sec`), td(String(wins))),
        );
      });
    }

    this.addChildrenComponents('end', winnersTable);
  }
}
