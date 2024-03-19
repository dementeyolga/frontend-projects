import BaseComponentView from '../BaseComponent/BaseComponentView';
import AppView from './AppView';

export default class AppPresenter {
  constructor(private readonly view: AppView) {}

  render(root: HTMLElement): void {
    root.prepend(this.view.getElement());
  }

  async setContent(view: BaseComponentView): Promise<void> {
    await this.view.removeChildrenComponents();
    await this.view.addChildrenComponents('end', view);
  }
}
