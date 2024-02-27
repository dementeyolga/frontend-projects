import { NewsResponse, SourcesResponse } from './interfaces';

export type ResponseData = NewsResponse | SourcesResponse;

export type DataProcessCallback<T extends ResponseData> = (data?: T) => void;

export type Endpoint = 'sources' | 'everything';
