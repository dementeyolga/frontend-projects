import AppPresenter from './app/components/App/AppPresenter';
import AppView from './app/components/App/AppView';
import Router from './app/components/services/router/Router';
import { appRoutes } from './app/components/services/router/routes';

const app = new AppPresenter(new AppView());
app.render(document.body);
const router = new Router(appRoutes, app);
router.init();

export default router;
