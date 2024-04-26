import AppView from './app/components/App/AppView';
import Router from './app/services/router/Router';
import { appRoutes } from './app/services/router/routes';

const app = new AppView();
app.render(document.body);
const router = new Router(appRoutes, app);
router.init();

export default app;
