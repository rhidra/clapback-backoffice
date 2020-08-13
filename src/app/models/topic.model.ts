export class Topic {

  _id: string;
  title: string;

  hashtags: Array<string>;
  suggestedHashtags: Array<string>;
  status: 'processing' | 'private' | 'public';
  date: string;

  centerPanel: {
    video: string;
    author: string;
  } = {video: '', author: ''};

  leftPanel: {
    video: string;
    text: string;
    textAlt: string
    image: string;
    quiz: string;
    author: string;
  } = {video: '', text: '', textAlt: '', image: '', quiz: '', author: ''};

  rightPanel: {
    video: string;
    text: string;
    textAlt: string;
    image: string;
    quiz: string;
    author: string;
  } = {video: '', text: '', textAlt: '', image: '', quiz: '', author: ''};

  likesCounter: number;
  viewsCounter: number;
  commentsCounter: number;
  clapbacksCounter: number;
}
