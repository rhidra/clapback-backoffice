import {Component, forwardRef, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => QuizComponent)}
  ]
})
export class QuizComponent implements OnInit, ControlValueAccessor {

  quizId: string;
  quiz: Quiz;
  form: FormGroup;
  isLoading = true;

  propagateChange: any = () => {};

  constructor(
    public fb: FormBuilder,
    public quizService: QuizService,
  ) { }

  ngOnInit() {}

  initForm() {
    this.form = this.fb.group({
      question: [this.quiz.question || '', [Validators.required]],
      content: [this.quiz.content || ''],
      isPoll: [this.quiz.isPoll || false],
      explanationText: [this.quiz.explanationText || ''],
      choices: this.fb.array([]),
    });
    if (!this.quiz.choices || this.quiz.choices.length === 0) {
      this.addChoice();
    } else {
      const choices = this.form.get('choices') as FormArray;
      this.quiz.choices.forEach(choice => choices.push(this.createChoice(choice)));
    }
    this.form.valueChanges.subscribe(() => this.propagateChange(Object.assign(this.form.value, this.form.value.isPoll ? {explanationText: ''} : {})));
    this.propagateChange(this.form.value);
    this.isLoading = false;
  }

  createChoice(choice: any = {}) {
    return this.fb.group({
      text: [choice.text || '', [Validators.required]],
      color: [choice.color || ''],
      goodAnswer: [choice.goodAnswer || false],
    });
  }

  hasMultipleGoodAnswers() {
    return this.form.value.choices && this.form.value.choices.filter(c => c.goodAnswer).length > 1 && !this.form.value.isPoll;
  }

  addChoice() {
    const choices = this.form.get('choices') as FormArray;
    choices.push(this.createChoice());
  }

  removeChoice(index = 0) {
    const choices = this.form.get('choices') as FormArray;
    choices.removeAt(index);
  }

  writeValue(obj: any): void {
    this.isLoading = true;
    this.quizId = obj;
    if (this.quizId) {
      this.quizService.get(this.quizId).then(quiz => {
        this.quiz = quiz;
        this.initForm();
      });
    } else {
      this.quiz = new Quiz();
      this.initForm();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
