import './sources.css';
import { SourceItem } from '../../../types/interfaces';

class Sources {
    draw(data: SourceItem[]): void {
        if (!data) throw new Error('Data not passed to draw function');

        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone: Node | null = sourceItemTemp.content.cloneNode(true);

                if (sourceClone instanceof DocumentFragment) {
                    const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) {
                        sourceItemName.textContent = item.name;
                    } else {
                        throw new Error("Element with selector '.source__item-name' doesn't exist");
                    }

                    const sourseItem: HTMLDivElement | null = sourceClone.querySelector('.source__item');
                    if (sourseItem) {
                        sourseItem.setAttribute('data-source-id', item.id);
                    } else {
                        throw new Error("Element with selector '.source__item' doesn't exist");
                    }

                    fragment.append(sourceClone);
                }
            });
        } else {
            throw new Error("Element with selector '#sourceItemTemp' doesn't exist");
        }

        const sources: HTMLDivElement | null = document.querySelector('.sources');
        if (sources) {
            sources.append(fragment);
        } else {
            throw new Error("Element with selector '.sources' doesn't exist");
        }
    }
}

export default Sources;
