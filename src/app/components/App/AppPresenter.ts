import AppModel from './AppModel';
import AppView from './AppView';

export default class AppPresenter {
  constructor(
    private readonly view: AppView,
    private readonly model: AppModel,
  ) {}

  render(root: HTMLElement): void {
    root.append(this.view.getElement());
  }
}
