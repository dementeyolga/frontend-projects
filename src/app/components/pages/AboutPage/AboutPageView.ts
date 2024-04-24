import { div, h2, p } from '../../../utils/tagViews';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import ButtonView from '../../common/Button/ButtonView';
import classes from './AboutPage.module.scss';

const aboutText1 =
  'Fun Chat is an online chat application that works through Web Socket connection to ensure smooth user experience and prompt UI updates. You can send messages to both online and offline users, as well as edit and delete your messages. ';

const aboutText2 =
  'App was developed by Olga Dementey, currently an RS School Frontend course student.';

export default class LoginPageView extends BaseComponentView {
  constructor() {
    super(
      { tagName: 'div', className: classes.page },
      new ButtonView(
        {
          type: 'button',
          textContent: 'Go to main page',
          className: classes.mainPageButton,
        },
        '#',
      ),
      h2('About'),
      div(classes.content, p(aboutText1), p(aboutText2)),
    );
  }
}
