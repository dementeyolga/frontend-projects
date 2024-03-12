import AppPresenter from './app/components/App/AppPresenter';
import AppModel from './app/components/App/AppModel';
import AppView from './app/components/App/AppView';

const app = new AppPresenter(new AppView(), new AppModel());
app.render(document.body);
