import { StateKeys } from '../../types/enums';
import { isUserCredentials } from '../../types/typeGuards';
import AppPresenter from '../../components/App/AppPresenter';
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

    this.state.subscribe(StateKeys.CurrentUser, this.showRelevantPage);
    this.showCurrentHashRoute();
  }

  async init(): Promise<void> {
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
    let currentPath = window.location.hash;
    if (currentPath.length) {
      currentPath = currentPath.slice(1);
    }

    return currentPath;
  }

  private showRelevantPage = async (): Promise<void> => {
    if (window.location.hash === '') {
      const user = this.state.getValue(StateKeys.CurrentUser);

      if (isUserCredentials(user)) {
        const { default: ChatPageView } = await import(
          '../../components/pages/ChatPage/ChatPageView'
        );

        this.app.setContent(new ChatPageView());
      } else {
        const { default: LoginPageView } = await import(
          '../../components/pages/LoginPage/LoginPageView'
        );

        this.app.setContent(new LoginPageView());
      }
    } else {
      const { default: AboutPageView } = await import(
        '../../components/pages/AboutPage/AboutPageView'
      );

      this.app.setContent(new AboutPageView());
    }
  };
}

export default Router;
