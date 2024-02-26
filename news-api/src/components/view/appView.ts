import News from './news/news';
import Categories from './categories/categories';
import { NewsItem, SourceItem, SourcesResponse, NewsResponse } from '../../types/interfaces';

export class AppView {
    protected news: News;
    protected categories: Categories;

    constructor() {
        this.news = new News();
        this.categories = new Categories();
    }

    drawNews<T extends NewsResponse>(data?: T): void {
        if (!data) {
            throw new Error('Data not provided to drawNews function');
        } else {
            const values: NewsItem[] = data.articles ? data.articles : [];
            this.news.draw(values);
        }
    }

    drawCategories<T extends SourcesResponse>(data?: T): void {
        if (!data) {
            throw new Error('Data not provided to drawCategories function');
        } else {
            const values: SourceItem[] = data.sources ? data.sources : [];
            this.categories.draw(values);
        }
    }
}

export default AppView;
