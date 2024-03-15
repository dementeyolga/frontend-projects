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
    const currentPath = document.location.pathname;
    await this.showRoute(currentPath);

    document.addEventListener('click', async (event: Event) => {
      const { target } = event;

      if (target instanceof HTMLElement && target.dataset.navigate) {
        const path = target.dataset.navigate;

        await this.showRoute(path);
      }
    });
  }

  async showRoute(path: string): Promise<void> {
    const route = this.routes.find((item) => item.path === path);

    if (route) {
      const routeView = await route.callback();
      await this.app.setContent(routeView);
    }
  }
}

export default Router;
