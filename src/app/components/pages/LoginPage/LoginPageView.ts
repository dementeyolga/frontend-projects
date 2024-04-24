import { div } from '../../../utils/tagViews';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import ButtonView from '../../common/Button/ButtonView';
import FormView from './Form/FormView';
import classes from './LoginPage.module.scss';

export default class LoginPageView extends BaseComponentView {
  constructor() {
    super(
      { tagName: 'div', className: classes.page },
      div(classes.formWrapper, new FormView()),
      new ButtonView(
        {
          type: 'button',
          textContent: 'About the app',
          className: classes.aboutButton,
        },
        'about',
      ),
    );
  }
}
