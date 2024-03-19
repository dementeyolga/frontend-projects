import BaseComponentView from './BaseComponentView';

export default class BaseComponentPresenter {
  constructor(private readonly view: BaseComponentView) {}

  getElement(): HTMLElement {
    return this.view.getElement();
  }
}
