import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import classes from './StartButton.module.scss';

export default class StartButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(link?: string) {
    super({
      tagName: 'button',
      className: classes.button,
      textContent: 'Start game',
    });

    if (typeof link === 'string') {
      this.element.dataset.navigate = link;
    }
  }
}
