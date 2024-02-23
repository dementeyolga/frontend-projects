import './news.css';
import { NewsItem } from '../../../types/interfaces';

class News {
    draw(data: NewsItem[]): void {
        if (!data) throw new Error("Data wasn't passed to draw function");

        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) throw new Error('News item is not a HTMLTemplateElement');
        news.forEach((item, idx) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment) {
                const newsItem: HTMLDivElement | null = newsClone.querySelector('.news__item');
                if (newsItem) {
                    if (idx % 2) newsItem.classList.add('alt');
                } else {
                    throw new Error(".news__item doesn't exist");
                }

                const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                } else {
                    throw new Error(".news__meta-photo doesn't exist");
                }

                const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                } else {
                    throw new Error(".news__meta-author' doesn't exist");
                }

                const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                } else {
                    throw new Error(".news__meta-date doesn't exist");
                }

                const newsDescriptionTitle: HTMLHeadingElement | null =
                    newsClone.querySelector('.news__description-title');
                if (newsDescriptionTitle) {
                    newsDescriptionTitle.textContent = item.title;
                } else {
                    throw new Error(".news__description-title doesn't exist");
                }

                const newsDescriptionSource: HTMLHeadingElement | null =
                    newsClone.querySelector('.news__description-source');
                if (newsDescriptionSource) {
                    newsDescriptionSource.textContent = item.source.name;
                } else {
                    throw new Error(".news__description-source doesn't exist");
                }

                const newsDescriptionContent: HTMLParagraphElement | null =
                    newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent) {
                    newsDescriptionContent.textContent = item.description;
                } else {
                    throw new Error(".news__description-content doesn't exist");
                }

                const newsReadMoreLink: HTMLParagraphElement | null = newsClone.querySelector('.news__read-more a');
                if (newsReadMoreLink) {
                    newsReadMoreLink.setAttribute('href', item.url);
                } else {
                    throw new Error(".news__read-more a doesn't exist");
                }

                fragment.append(newsClone);
            }
        });

        const newsContainer: HTMLDivElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
