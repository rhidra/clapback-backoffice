import {HelperService} from '../utils/helper.service';

export class Model {
  name: string;
  id: string;
  algo: string;
  trainingDate: Date;
  publishedDate: Date;
  trainingPrecision: number;
  prodPrecision: number;
  tags: Array<Tag> = [];

  trainingPath: string = '';
  prodPath: string = '';

  constructor (name: string = '') {
    this.name = name;
  }
}

export class Tag {
  label: string;
  color: string;
  shortcut: string;

  constructor (label: string = '') {
    this.label = label;
    this.color = HelperService.getRandomColor();
    this.shortcut = 'SPACE';
  }
}
