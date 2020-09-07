import {User} from './user.model';
import {Topic} from './topic.model';

export class Reaction {
  _id: string;

  topic: string | Topic;
  user: string | User;
  date: string;
  hashtags: Array<string>;
  isPublic: boolean;
  isProcessing: boolean;

  video: string;
  text: string;

  likesCounter: number;
  commentsCounter: number;
  viewsCounter: number;
}
