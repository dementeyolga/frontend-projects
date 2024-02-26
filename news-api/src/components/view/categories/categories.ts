import './categories.css';
import Sources from './sources/sources';
import { SourceItem } from '../../../types/interfaces';

class Categories {
    private: Sources = new Sources();

    draw(data: SourceItem[]): void {
        const categories: string[] = Array.from(new Set(data.map((item) => item.category)));

        const categoriesFragment: DocumentFragment = document.createDocumentFragment();
        const categoryItemTemp: HTMLTemplateElement | null = document.querySelector('#categoryItemTemp');

        if (categoryItemTemp instanceof HTMLTemplateElement) {
            categories.forEach((item) => {
                const categoryClone: Node | null = categoryItemTemp.content.cloneNode(true);

                if (categoryClone instanceof DocumentFragment) {
                    const categoryItemName: HTMLSpanElement | null =
                        categoryClone.querySelector('.category__item-name');
                    if (categoryItemName instanceof HTMLSpanElement) {
                        categoryItemName.textContent = item;
                    } else {
                        throw new Error(`Element with selector '.category__item-name' is not of type HTMLSpanElement`);
                    }

                    const categoryItem: HTMLDivElement | null = categoryClone.querySelector('.category__item');
                    if (categoryItem instanceof HTMLDivElement) {
                        categoryItem.setAttribute('data-category', item);
                    } else {
                        throw new Error(`Element with selector '.source__item' is not of type HTMLDivElement`);
                    }

                    categoriesFragment.append(categoryClone);
                } else {
                    throw new Error(`Copy of Source item template content is not of type DocumentFragment`);
                }
            });
        } else {
            throw new Error(`Element with selector '#categoryItemTemp' is not of type HTMLTemplateElement`);
        }

        const categoriesEl: HTMLDivElement | null = document.querySelector('.categories');
        if (categoriesEl instanceof HTMLDivElement) {
            categoriesEl.append(categoriesFragment);

            categoriesEl.addEventListener('click', (e: MouseEvent) =>
                console.log('e.target', e.target, 'e.currentTarget', e.currentTarget)
            );
        } else {
            throw new Error(`Element with selector '.categories' is not of type HTMLDivElement`);
        }
    }
}

export default Categories;
