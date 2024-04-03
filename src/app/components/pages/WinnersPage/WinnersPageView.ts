import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { h1, p, table, td, tr } from '../../../utils/tagViews';
import HeaderView from '../../common/Header/HeaderView';
import { getCar, getWinners } from '../../../utils/asyncRaceApi';
import classes from './WinnersPage.module.scss';

export default class GaragePageView extends BaseComponentView<HTMLDivElement> {
  private readonly winnersQuantityComp: BaseComponentView<HTMLParagraphElement>;

  constructor() {
    super(
      {
        tagName: 'div',
        className: 'page',
      },
      new HeaderView(),
      h1('h1', 'Winners'),
    );

    this.winnersQuantityComp = p('', classes.winnersQuantity);
    this.addChildrenComponents('end', this.winnersQuantityComp);

    this.updateWinnersQuantity();
    this.displayWinners();
  }

  async displayWinners(): Promise<void> {
    const winners = await getWinners();
    const winnersTable = table('');

    if (winners) {
      winnersTable.addChildrenComponents(
        'end',
        tr(classes.row, td('No'), td('Name'), td('ID'), td('Time'), td('Wins')),
      );

      winners.forEach(async (winner, index) => {
        const { id, time, wins } = winner;
        const car = await getCar(id);

        let name;
        if (car && car.name) {
          name = car.name;
        }

        winnersTable.addChildrenComponents(
          'end',
          tr(
            classes.row,
            td(String(index + 1)),
            td(name || ''),
            td(String(id)),
            td(`${time} sec`),
            td(String(wins)),
          ),
        );
      });
    }

    this.addChildrenComponents('end', winnersTable);
  }

  private async updateWinnersQuantity(): Promise<void> {
    const quantity = await GaragePageView.getTotalWinnersQuantity();

    this.winnersQuantityComp.setTextContent(`Total winners: ${quantity}`);
  }

  private static async getTotalWinnersQuantity(): Promise<number> {
    const winners = await getWinners();

    if (winners) {
      return winners.length;
    }

    return 0;
  }
}
