export class Text {
  content: string;
  id: string;
  model: string;
  annotatedContent: string = '';
  globalTags: Array<string> = [];
  isAnnotated: boolean = false;

  constructor (model: string, content: string) {
    this.model = model;
    this.content = content;
  }
}
