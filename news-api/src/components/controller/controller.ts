import AppLoader from './appLoader';
import { DataProcessCallback } from '../../types/types';
import { NewsResponse, SourcesResponse } from '../../types/interfaces';

class AppController extends AppLoader {
    getCategories(callback: DataProcessCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getSources(callback: DataProcessCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: DataProcessCallback<NewsResponse>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (newsContainer instanceof HTMLElement) {
            while (target !== newsContainer) {
                if (target instanceof HTMLElement) {
                    if (target.classList.contains('source__item')) {
                        const sourceId: string | null = target.getAttribute('data-source-id');
                        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp<NewsResponse>(
                                {
                                    endpoint: 'everything',
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    }
}

export default AppController;
