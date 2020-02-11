import {NewsItem} from './newsitem.model';

export class NewsGroup {
    _id: string;
    content: string;
    date: string;
    image: string;
    items: Array<NewsItem> = [];
    approved: boolean;
}
