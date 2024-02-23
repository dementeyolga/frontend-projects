import { NewsResponse } from './interfaces';
import { SourcesResponse } from './interfaces';

export type ResponseData = NewsResponse | SourcesResponse;

export type DataProcessCallback = (data: ResponseData) => void;

export type Endpoint = 'sources' | 'everything';
