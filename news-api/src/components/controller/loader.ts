import { LoaderOptions, SourcesOptions } from '../../types/interfaces';
import { GetRespOptions } from '../../types/interfaces';
import { DataProcessCallback } from '../../types/types';
import { NewsItem } from '../../types/interfaces';
import { SourceItem } from '../../types/interfaces';

class Loader {
    protected baseLink: string;
    protected options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: GetRespOptions,
        callback: DataProcessCallback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: SourcesOptions, endpoint: string): string {
        const urlOptions: LoaderOptions & SourcesOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            if (urlOptions[key]) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: DataProcessCallback, options: SourcesOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: NewsItem | SourceItem) => {
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
