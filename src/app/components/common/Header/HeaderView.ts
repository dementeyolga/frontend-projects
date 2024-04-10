import BaseComponentView from '../../BaseComponent/BaseComponentView';
import ButtonView from '../Button/ButtonView';
import classes from './Header.module.scss';

export default class HeaderView extends BaseComponentView<HTMLElement> {
  constructor() {
    super(
      {
        tagName: 'header',
        className: classes.header,
      },
      new ButtonView('', 'button', 'To garage', '#'),
      new ButtonView('', 'button', 'Winners table', 'winners'),
    );
  }
}
