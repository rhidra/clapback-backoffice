export class Quiz {
  _id: string;
  question: string;
  content: string;
  topic: string;
  isPoll: boolean;

  choices: Array<{
    text: string,
    color: string,
    goodAnswer: boolean,
  }> = [];
}
