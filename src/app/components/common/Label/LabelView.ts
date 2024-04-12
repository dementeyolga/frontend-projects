import BaseComponentView from '../../BaseComponent/BaseComponentView';
import InputView from '../Input/InputView';

export default class LabelView extends BaseComponentView<HTMLLabelElement> {
  protected declare element: HTMLLabelElement;

  constructor(labelName: string, childInput: InputView) {
    super(
      {
        tagName: 'label',
        textContent: labelName,
      },
      childInput,
    );
  }

  protected override setParameters(params: Partial<HTMLLabelElement>): void {
    super.setParameters(params);

    const { htmlFor } = params;

    if (htmlFor) {
      this.element.htmlFor = htmlFor;
    }
  }
}
