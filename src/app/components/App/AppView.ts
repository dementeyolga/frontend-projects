import BaseComponentView from '../BaseComponent/BaseComponentView';
import classes from './AppView.module.scss';
import '../../../styles/main.scss';

export default class AppView extends BaseComponentView {
  constructor() {
    super({ tagName: 'div', className: classes.app });
  }
}
