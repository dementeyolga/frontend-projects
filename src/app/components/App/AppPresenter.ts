import BaseComponentView from '../BaseComponent/BaseComponentView';
import AppView from './AppView';

export default class AppPresenter {
  constructor(private readonly view: AppView) {}

  render(root: HTMLElement): void {
    root.prepend(this.view.getElement());
  }

  setContent(view: BaseComponentView): void {
    this.view.removeChildrenComponents();
    this.view.addChildrenComponents('end', view);
  }
}
