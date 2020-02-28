export class Topic {

  _id: string;
  title: string;

  author: string;
  video: string;
  hashtag: string;
  approved: boolean;
  date: string;

  leftPanel: {
    video: string;
    text: string;
    image: string;
    quiz: string;
  } = {video: '', text: '', image: '', quiz: ''};

  rightPanel: {
    video: string;
    text: string;
    image: string;
    quiz: string;
  } = {video: '', text: '', image: '', quiz: ''};
}
