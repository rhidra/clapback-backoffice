export class Quiz {
  _id: string;
  question: string;
  content: string;
  topic: string;
  isPoll: boolean;
  explanationText: string;

  choices: Array<{
    text: string,
    color: string,
    goodAnswer: boolean,
  }> = [];
}
