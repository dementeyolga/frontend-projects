export interface Source {
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
    sources: Source[];
}

export interface News {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<Source, 'id' | 'name'>;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: News[];
}
