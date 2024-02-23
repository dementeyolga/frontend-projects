export interface SourceItem {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface SourcesResponse {
    status: string;
    sources: SourceItem[];
}

export interface NewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<SourceItem, 'id' | 'name'>;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}
