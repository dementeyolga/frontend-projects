import AppPresenter from '../../App/AppPresenter';
import { Route } from './routes';

class Router {
  private readonly routes: Route[];

  private app: AppPresenter;

  constructor(routes: Route[], app: AppPresenter) {
    this.routes = routes;
    this.app = app;
  }

  async init(): Promise<void> {
    const currentPath = Router.getCurrentPath();

    await this.showRoute(currentPath);

    window.addEventListener('hashchange', async () => {
      const path = Router.getCurrentPath();

      await this.showRoute(path);
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

  private static getCurrentPath(): string {
    let currentPath = document.location.hash;
    if (currentPath.length) {
      currentPath = currentPath.slice(1);
    }

    return currentPath;
  }

  private async showRoute(path: string): Promise<void> {
    const route = this.routes.find((item) => item.path === path);

    if (route) {
      const routeView = await route.callback();
      await this.app.setContent(routeView);
    }
  }
}

export default Router;
