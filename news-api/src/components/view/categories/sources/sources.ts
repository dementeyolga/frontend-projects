import './sources.css';
import { SourceItem } from './../../../../types/interfaces';

class Sources {
    draw(data: SourceItem[]): void {
        const sources: HTMLDivElement | null = document.querySelector('.sources');

        if (sources instanceof HTMLDivElement) {
            sources.innerHTML = 'Is loading ...';

            const sourcesFragment = this.createSourcesBtnsFragment(data);

            sources.innerHTML = '';
            sources.append(sourcesFragment);
        } else {
            throw new Error(`Element with selector '.sources' is not of type HTMLDivElement`);
        }
    }

    private createSourcesBtnsFragment(data: SourceItem[]): DocumentFragment {
        const sourcesFragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp instanceof HTMLTemplateElement) {
            data.forEach((item) => {
                const sourceClone: Node | null = sourceItemTemp.content.cloneNode(true);

                if (sourceClone instanceof DocumentFragment) {
                    this.fillSourceBtn(sourceClone, item);
                    sourcesFragment.append(sourceClone);
                } else {
                    throw new Error(`Copy of Source item template content is not of type DocumentFragment`);
                }
            });

            return sourcesFragment;
        } else {
            throw new Error(`Element with selector '#sourceItemTemp' is not of type HTMLTemplateElement`);
        }
    }

    private fillSourceBtn(sourceClone: DocumentFragment, item: SourceItem): void {
        const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector('.source__item-name');
        if (sourceItemName instanceof HTMLSpanElement) {
            sourceItemName.textContent = item.name;
        } else {
            throw new Error(`Element with selector '.source__item-name' is not of type HTMLSpanElement`);
        }

        const sourseItem: HTMLDivElement | null = sourceClone.querySelector('.source__item');
        if (sourseItem instanceof HTMLDivElement) {
            sourseItem.setAttribute('data-source-id', item.id);
        } else {
            throw new Error(`Element with selector '.source__item' is not of type HTMLDivElement`);
        }
    }
}

export default Sources;
