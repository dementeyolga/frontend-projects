import News from './news/news';
import Sources from './sources/sources';
import { NewsItem, SourceItem, SourcesResponse, NewsResponse } from '../../types/interfaces';

export class AppView {
    protected news: News;
    protected sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        if (!data) {
            throw new Error('Data not provided to drawNews function');
        } else {
            const values: NewsItem[] = data.articles ? data.articles : [];
            this.news.draw(values);
        }
    }

    drawSources(data: SourcesResponse): void {
        if (!data) {
            throw new Error('Data not provided to drawSources function');
        } else {
            const values: SourceItem[] = data.sources ? data.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
