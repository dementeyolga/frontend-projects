import { CustomEvents } from '../../../types/enums';
import { p } from '../../../utils/tagViews';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import InputView from '../Input/InputView';
import classes from './Label.module.scss';

export default class LabelView extends BaseComponentView<HTMLLabelElement> {
  protected declare element: HTMLLabelElement;

  private readonly errorMsg: BaseComponentView<HTMLDivElement>;

  private inputComp: InputView;

  constructor(labelName: string, childinputComp: InputView) {
    super(
      {
        className: classes.label,
        tagName: 'label',
        textContent: labelName,
      },
      childinputComp,
    );

    this.inputComp = childinputComp;
    this.errorMsg = p('', classes.errorMsg);
    this.addChildrenComponents('end', this.errorMsg);

    this.initListeners();
  }

  protected override setParameters(params: Partial<HTMLLabelElement>): void {
    super.setParameters(params);

    const { htmlFor } = params;

    if (htmlFor) {
      this.element.htmlFor = htmlFor;
    }
  }

  private initListeners(): void {
    this.element.addEventListener(CustomEvents.FormInput, () => {
      if (this.inputComp.checkValid()) {
        this.errorMsg.setTextContent('');
      } else {
        let errorText = '';

        if (this.inputComp.checkTooShort()) {
          errorText += `${this.inputComp.getName()[0].toUpperCase() + this.inputComp.getName().slice(1) || 'Value'} must contain at least ${this.inputComp.getMinLength()} characters, you typed ${this.inputComp.getValue().length}.`;
        }

        if (this.inputComp.checkPatternMismatch()) {
          errorText += errorText ? '<br>' : '';
          errorText += this.inputComp.patternMessage;
        }

        this.errorMsg.setInnerHTML(errorText);
      }
    });
  }
}
