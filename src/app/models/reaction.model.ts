import {User} from './user.model';
import {Topic} from './topic.model';

export class Reaction {
  _id: string;

  topic: string | Topic;
  user: string | User;
  date: string;

  video: string;
  text: string;
}