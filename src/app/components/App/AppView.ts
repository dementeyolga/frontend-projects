import BaseComponentView from '../BaseComponent/BaseComponentView';
import classes from './AppView.module.scss';
import '../../../styles/main.scss';
import StateManagementService from '../../services/StateManagementService/StateManagementService';
import { CustomEvents, StateKeys } from '../../types/enums';
import ErrorModalView from '../common/ErrorModal/ErrorModalView';

export default class AppView extends BaseComponentView {
  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  private errorModal: ErrorModalView | null = null;

  constructor() {
    super({ tagName: 'div', className: classes.app });

    this.state.subscribe(StateKeys.LoginError, this.showErrorModal);

    this.initListeners();
  }

  override destroy(): void {
    this.state.unsubscribe(StateKeys.LoginError, this.showErrorModal);
  }

  private showErrorModal = (): void => {
    const errorMessage = this.state.getValue(StateKeys.LoginError);

    if (typeof errorMessage === 'string') {
      this.errorModal = new ErrorModalView(errorMessage);
      this.addChildrenComponents('end', this.errorModal);
    }
  };

  private initListeners(): void {
    this.element.addEventListener(CustomEvents.RemoveErrorModal, () => {
      if (this.errorModal) {
        this.removeChildComponent(this.errorModal);

        this.errorModal = null;
      }
    });
  }
}
