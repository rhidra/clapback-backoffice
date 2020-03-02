export class Topic {
  question: string;
  content: string;
  topic: string;

  choices: Array<{
    text: string,
    color: string,
  }> = [];
}
