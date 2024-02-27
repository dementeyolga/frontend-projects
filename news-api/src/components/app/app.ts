import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController = new AppController();
    private view: AppView = new AppView();
    private currentSourceBtn: HTMLDivElement | null = null;

    start(): void {
        const sources: HTMLDivElement | null = document.querySelector('.sources');
        if (sources instanceof HTMLDivElement) {
            sources.addEventListener('click', (e) => {
                const target: EventTarget | null = e.target;

                if (target instanceof HTMLElement) {
                    const sourceButton: HTMLDivElement | null = target.closest('.source__item');

                    if (sourceButton instanceof HTMLDivElement) {
                        if (this.currentSourceBtn) {
                            this.currentSourceBtn.classList.remove('active');
                        }
                        this.currentSourceBtn = sourceButton;
                        sourceButton.classList.add('active');
                        this.controller.getNews(e, (data) => this.view.drawNews(data));
                    }
                }
            });
        } else {
            throw new Error(`Element with selector '.sources' doesn't exist or has the wrong type.`);
        }

        this.controller.getCategories((data) => this.view.drawCategories(data));
    }
}

export default App;
