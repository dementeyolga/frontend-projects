import AppPresenter from './app/components/App/AppPresenter';
import AppModel from './app/components/App/AppModel';
import AppView from './app/components/App/AppView';
import Router from './app/components/services/router/Router';
import { appRoutes } from './app/components/services/router/routes';

const app = new AppPresenter(new AppView(), new AppModel());
app.render(document.body);
const router = new Router(appRoutes, app);
router.init();

export default router;
