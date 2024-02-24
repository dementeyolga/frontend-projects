import './news.css';
import { NewsItem } from '../../../types/interfaces';

class News {
    draw(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (newsItemTemp instanceof HTMLTemplateElement) {
            news.forEach((item, idx) => {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);

                if (newsClone instanceof DocumentFragment) {
                    const newsItem: HTMLDivElement | null = newsClone.querySelector('.news__item');
                    if (newsItem instanceof HTMLDivElement) {
                        if (idx % 2) newsItem.classList.add('alt');
                    } else {
                        throw new Error(`Element with selector '.news__item' is not of type HTMLDivElement`);
                    }

                    const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto instanceof HTMLDivElement) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    } else {
                        throw new Error(`Element with selector '.news__meta-photo' is not of type HTMLDivElement`);
                    }

                    const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthor instanceof HTMLLIElement) {
                        newsMetaAuthor.textContent = item.author || item.source.name;
                    } else {
                        throw new Error(`Element with selector '.news__meta-author' is not of type HTMLLIElement`);
                    }

                    const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate instanceof HTMLLIElement) {
                        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    } else {
                        throw new Error(`Element with selector '.news__meta-date' is not of type HTMLLIElement`);
                    }

                    const newsDescriptionTitle: HTMLHeadingElement | null =
                        newsClone.querySelector('.news__description-title');
                    if (newsDescriptionTitle instanceof HTMLHeadingElement) {
                        newsDescriptionTitle.textContent = item.title;
                    } else {
                        throw new Error(
                            `Element with selector '.news__description-title' is not of type HTMLHeadingElement`
                        );
                    }

                    const newsDescriptionSource: HTMLHeadingElement | null =
                        newsClone.querySelector('.news__description-source');
                    if (newsDescriptionSource instanceof HTMLHeadingElement) {
                        newsDescriptionSource.textContent = item.source.name;
                    } else {
                        throw new Error(
                            `Element with selector '.news__description-source' is not of type HTMLHeadingElement`
                        );
                    }

                    const newsDescriptionContent: HTMLParagraphElement | null =
                        newsClone.querySelector('.news__description-content');
                    if (newsDescriptionContent instanceof HTMLParagraphElement) {
                        newsDescriptionContent.textContent = item.description;
                    } else {
                        throw new Error(
                            `Element with selector '.news__description-content' is not of type HTMLParagraphElement`
                        );
                    }

                    const newsReadMoreLink: HTMLParagraphElement | null = newsClone.querySelector('.news__read-more a');
                    if (newsReadMoreLink instanceof HTMLParagraphElement) {
                        newsReadMoreLink.setAttribute('href', item.url);
                    } else {
                        throw new Error(
                            `Element with selector '.news__read-more a' is not of type HTMLParagraphElement`
                        );
                    }

                    fragment.append(newsClone);
                } else {
                    throw new Error('Copy of News item template content is not of type DocumentFragment');
                }
            });

            const newsContainer: HTMLDivElement | null = document.querySelector('.news');
            if (newsContainer instanceof HTMLDivElement) {
                newsContainer.innerHTML = '';
                newsContainer.appendChild(fragment);
            } else {
                throw new Error(`Element with selector '.news' is not of type HTMLDivElement`);
            }
        } else {
            throw new Error(`Element with selector '#newsItemTemp' is not of type HTMLTemplateElement`);
        }
    }
}

export default News;
