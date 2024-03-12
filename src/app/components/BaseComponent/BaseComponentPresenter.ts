import BaseComponentModel from './BaseComponentModel';
import BaseComponentView from './BaseComponentView';

export default class BaseComponentPresenter {
  constructor(
    private readonly view: BaseComponentView,
    private readonly model: BaseComponentModel,
  ) {}

  getElement(): HTMLElement {
    return this.view.getElement();
  }
}
