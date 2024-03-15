import { div, h1, p } from '../../../utils/tagViews';
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
      div(
        classes.pageMain,
        undefined,
        h1(classes.h1, 'RSS Puzzle'),
        p(
          classes.description,
          'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Gameplay includes assembling sentences from jumbled words.',
        ),
      ),
    );
  }
}
