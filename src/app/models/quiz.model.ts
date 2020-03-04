export class Quiz {
  _id: string;
  question: string;
  content: string;
  topic: string;

  choices: Array<{
    text: string,
    color: string,
  }> = [];
}
