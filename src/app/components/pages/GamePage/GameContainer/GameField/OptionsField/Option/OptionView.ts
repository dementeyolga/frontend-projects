import BaseComponentView from '../../../../../../BaseComponent/BaseComponentView';
import classes from './Option.module.scss';

export default class OptionView extends BaseComponentView<HTMLDivElement> {
  constructor(textContent: string) {
    super({
      tagName: 'div',
      className: classes.option,
      textContent,
    });
  }
}
