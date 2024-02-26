import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/mocks/', {
            apiKey: 'a198a99f52de4edf8084d422ea4af96a',
        });
    }
}

export default AppLoader;
