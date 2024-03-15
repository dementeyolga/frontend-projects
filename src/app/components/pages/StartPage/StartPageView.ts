import { FormFields, LocalStorageValues } from '../../../types/enums';
import { UserInfo } from '../../../types/types';
import { div, h1, p } from '../../../utils/tagViews';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import HeaderView from '../../common/Header/HeaderView';
import StartButtonView from './StartButton/StartButtonView';
import classes from './StartPage.module.scss';

export default class StartPageView extends BaseComponentView<HTMLDivElement> {
  private mainContent: BaseComponentView<HTMLDivElement>;

  constructor() {
    const main = div(
      classes.pageMain,
      undefined,
      h1(classes.h1, 'RSS Puzzle'),
      p(
        classes.description,
        'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Put words in the right order to make correct sentences.',
      ),
      new StartButtonView('game'),
    );

    super(
      {
        tagName: 'div',
        className: classes.page,
      },
      undefined,
      new HeaderView(),
      main,
    );

    this.mainContent = main;
    this.showCredentialsFromLocalStorage();
  }

  private showCredentialsFromLocalStorage(): void {
    const userInfo = localStorage.getItem(LocalStorageValues.FormData);

    if (userInfo) {
      const userData: UserInfo = JSON.parse(userInfo);

      this.mainContent.addChildrenComponents(
        'begin',
        p(
          classes.greeting,
          `Hello, ${userData[FormFields.FirstName]} ${userData[FormFields.Surname]}!`,
        ),
      );
    }
  }
}
