import { SourcesResponse } from '../../types/interfaces';
import { ResponseData } from '../../types/types';
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
        if (sources) {
            sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        }

        this.controller.getSources((data: ResponseData) => this.view.drawSources(data));
    }
}

export default App;
