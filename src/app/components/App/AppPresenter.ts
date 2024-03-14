import BaseComponentView from '../BaseComponent/BaseComponentView';
import AppModel from './AppModel';
import AppView from './AppView';

export default class AppPresenter {
  constructor(
    private readonly view: AppView,
    private readonly model: AppModel,
  ) {}

  render(root: HTMLElement): void {
    root.prepend(this.view.getElement());
  }

  async setContent(view: BaseComponentView): Promise<void> {
    await this.view.removeChildrenComponents();
    await this.view.addChildrenComponents(view);
    console.log('view after new components added', this.view);
  }
}
