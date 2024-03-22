import AppPresenter from './app/components/App/AppPresenter';
import AppView from './app/components/App/AppView';
import Router from './app/components/services/router/Router';
import { appRoutes } from './app/components/services/router/routes';
import { getCar, getCars } from './app/utils/asyncRaceApi';

const app = new AppPresenter(new AppView());
app.render(document.body);
const router = new Router(appRoutes, app);
router.init();

async function test() {
  console.log(await getCars());

  console.log(await getCar(1));
}

test();
