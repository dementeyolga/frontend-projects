import { NewsItem } from './interfaces';
import { SourceItem } from './interfaces';

export type DataProcessCallback = (data: NewsItem | SourceItem) => void;

export type Endpoint = 'sources' | 'everything';
