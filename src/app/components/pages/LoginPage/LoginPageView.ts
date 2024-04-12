import BaseComponentView from '../../BaseComponent/BaseComponentView';
import FormView from './Form/FormView';
import classes from './LoginPage.module.scss';

export default class LoginPageView extends BaseComponentView {
  constructor() {
    super({ tagName: 'div', className: classes.page }, new FormView());
  }
}
