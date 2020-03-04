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
    private fb: FormBuilder,
    private quizService: QuizService,
  ) { }

  ngOnInit() {}

  initForm() {
    this.form = this.fb.group({
      question: [this.quiz.question || '', [Validators.required]],
      content: [this.quiz.content || ''],
      choices: this.fb.array([]),
    });
    if (!this.quiz.choices || this.quiz.choices.length === 0) {
      this.addChoice();
    } else {
      this.quiz.choices.forEach(choice => {
        const choices = this.form.get('choices') as FormArray;
        choices.push(this.fb.group({
          text: [choice.text || '', [Validators.required]],
          color: [choice.color || ''],
        }));
      });
    }
    this.form.valueChanges.subscribe(() => this.propagateChange(this.form.value));
    this.propagateChange(this.form.value);
    this.isLoading = false;
  }

  createChoice() {
    return this.fb.group({
      text: ['', [Validators.required]],
      color: [''],
    });
  }

  addChoice() {
    const choices = this.form.get('choices') as FormArray;
    choices.push(this.createChoice());
  }

  removeChoice() {
    const choices = this.form.get('choices') as FormArray;
    choices.removeAt(0);
  }

  writeValue(obj: any): void {
    this.isLoading = true;
    this.quizId = obj;
    if (this.quizId) {
      this.quizService.get(this.quizId).then(quiz => {
        console.log(quiz);
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
