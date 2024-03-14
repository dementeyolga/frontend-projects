import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './LoginFormLabel.module.scss';

export default class LoginFormLabelView extends BaseComponentView<HTMLLabelElement> {
  protected declare element: HTMLLabelElement;

  constructor(labelName: string) {
    super({
      tagName: 'label',
      textContent: labelName,
      className: classes.label,
    });
  }
}
