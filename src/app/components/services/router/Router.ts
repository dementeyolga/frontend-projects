import { StateKeys } from '../../../types/enums';
import AppPresenter from '../../App/AppPresenter';
import ChatPageView from '../../pages/ChatPage/ChatPageView';
import StateManagementService from '../StateManagementService/StateManagementService';
import { Route } from './routes';

class Router {
  private readonly routes: Route[];

  private readonly app: AppPresenter;

  private readonly state: StateManagementService =
    StateManagementService.getInstance();

  constructor(routes: Route[], app: AppPresenter) {
    this.routes = routes;
    this.app = app;

    this.showMainPage = this.showMainPage.bind(this);
    this.state.subscribe(StateKeys.Login, this.showMainPage);
  }

  async init(): Promise<void> {
    await this.showCurrentHashRoute();

    window.addEventListener('hashchange', async () => {
      await this.showCurrentHashRoute();
    });

    document.addEventListener('click', async (event: Event) => {
      const { target } = event;

      if (target instanceof HTMLElement && target.dataset.navigate) {
        let path = target.dataset.navigate;
        window.location.hash = path;
        if (path.startsWith('#')) path = path.slice(1);
        await this.showRoute(path);
      }
    });
  }

  async showCurrentHashRoute() {
    const currentPath = Router.getCurrentPath();
    await this.showRoute(currentPath);
  }

  private async showRoute(path: string): Promise<void> {
    const route = this.routes.find((item) => item.path === path);

    if (route) {
      const routeView = await route.callback();

      if (routeView) {
        this.app.setContent(routeView);
      }
    }
  }

  private static getCurrentPath(): string {
    let currentPath = document.location.hash;
    if (currentPath.length) {
      currentPath = currentPath.slice(1);
    }

    return currentPath;
  }

  private showMainPage(): void {
    this.app.setContent(new ChatPageView());
  }
}

export default Router;
