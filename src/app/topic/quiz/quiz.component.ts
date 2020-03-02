import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => QuizComponent)}
  ]
})
export class QuizComponent implements OnInit, ControlValueAccessor {

  quizId: string;

  propagateChange: any = () => {};

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.quizId = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
