import { LoaderOptions, SourcesOptions, GetRespOptions } from '../../types/interfaces';
import { DataProcessCallback, Endpoint, ResponseData } from '../../types/types';
import { ErrorCodes, HTTPMethods } from '../../types/enums';

class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    protected constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T extends ResponseData>(
        { endpoint, options = {} }: GetRespOptions,
        callback: DataProcessCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HTTPMethods.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorCodes.Unauthorized || res.status === ErrorCodes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: SourcesOptions, endpoint: Endpoint): string {
        const urlOptions: LoaderOptions & SourcesOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            if (urlOptions[key]) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T extends ResponseData>(
        method: HTTPMethods,
        endpoint: Endpoint,
        callback: DataProcessCallback<T>,
        options: SourcesOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
