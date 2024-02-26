import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    protected controller: AppController;
    protected view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources: HTMLDivElement | null = document.querySelector('.sources');
        if (sources instanceof HTMLDivElement) {
            sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        } else {
            throw new Error(`Element with selector '.sources' doesn't exist or has the wrong type.`);
        }

        this.controller.getSources((data) => this.view.drawCategories(data));
    }
}

export default App;
