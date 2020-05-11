import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TopicService} from '../topic.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {Location} from '@angular/common';
import {Topic} from '../../models/topic.model';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../models/user.model';
import {UserService} from '../../user/user.service';
import {QuizService} from '../quiz/quiz.service';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipEvent, MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class TopicEditComponent implements OnInit {
  form: FormGroup;
  topic: Topic;
  isCreation: boolean;
  isLoading = true;
  uploading = 0;
  leftPanelType: string;
  rightPanelType: string;
  authors: Array<User>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  get items() { return this.form.get('items') as FormArray; }

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public topicService: TopicService,
    public navbarService: NavbarService,
    public location: Location,
    public authService: AuthService,
    public userService: UserService,
    public quizService: QuizService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New topic' : 'Edit topic', null, '', null, [], null, () => this.location.back());

      if (this.isCreation) {
        this.topic = new Topic();
        this.leftPanelType = 'video';
        this.rightPanelType = 'video';
        this.initForm();
      } else {
        this.topicService.get(id).then((topic: Topic) => {
          this.topic = topic;
          this.leftPanelType = this.topic.leftPanel.quiz ? 'quiz' : this.topic.leftPanel.text ? 'text' : 'video';
          this.rightPanelType = this.topic.rightPanel.quiz ? 'quiz' : this.topic.rightPanel.text ? 'text' : 'video';
          this.initForm();
        });
      }

      this.userService.search().then(() => {
        this.authors = this.userService.users.filter(user => user.verified);
      });
    });
  }

  initForm() {
    this.form = this.fb.group({
      date: [this.topic.date || '', [Validators.required]],
      title: [this.topic.title || '', [Validators.required]],
      hashtags: [this.topic.hashtags || []],
      suggestedHashtags: [this.topic.suggestedHashtags || []],
      approved: [this.topic.approved || false],

      centerPanel: this.fb.group({
        video: [this.topic.centerPanel.video || ''],
        author: [this.topic.centerPanel.author || this.authService.user._id, [Validators.required]],
      }),

      leftPanel: this.fb.group({
        video: [this.topic.leftPanel.video || ''],
        text: [this.topic.leftPanel.text || ''],
        textAlt: [this.topic.leftPanel.textAlt || ''],
        image: [this.topic.leftPanel.image || ''],
        quiz: [this.topic.leftPanel.quiz || ''],
        author: [this.topic.leftPanel.author || this.authService.user._id, [Validators.required]],
      }),

      rightPanel: this.fb.group({
        video: [this.topic.rightPanel.video || ''],
        text: [this.topic.rightPanel.text || ''],
        textAlt: [this.topic.rightPanel.textAlt || ''],
        image: [this.topic.rightPanel.image || ''],
        quiz: [this.topic.rightPanel.quiz || ''],
        author: [this.topic.rightPanel.author || this.authService.user._id, [Validators.required]],
      }),
    });
    this.isLoading = false;
  }

  changeType(type, panel) {
    if (panel === 'leftPanel') {
      this.leftPanelType = type;
    } else {
      this.rightPanelType = type;
    }
  }

  updateForm() {
    const p = [];
    if (this.leftPanelType === 'video') {
      this.form.controls.leftPanel.patchValue({text: null, textAlt: null, image: null, quiz: null});
    } else if (this.leftPanelType === 'text') {
      this.form.controls.leftPanel.patchValue({video: null, quiz: null});
    } else {
      this.form.controls.leftPanel.patchValue({text: null, textAlt: null, image: null, video: null});
      const quiz = this.form.value.leftPanel.quiz;
      if (quiz._id) {
        p.push(this.quizService.edit(quiz));
      } else {
        p.push(this.quizService.create(quiz).then(q => this.form.controls.leftPanel.patchValue({quiz: q._id})));
      }
    }
    if (this.rightPanelType === 'video') {
      this.form.controls.rightPanel.patchValue({text: null, textAlt: null, image: null, quiz: null});
    } else if (this.rightPanelType === 'text') {
      this.form.controls.rightPanel.patchValue({video: null, quiz: null});
    } else {
      this.form.controls.rightPanel.patchValue({text: null, textAlt: null, image: null, video: null});
      const quiz = this.form.value.rightPanel.quiz;
      if (quiz._id) {
        p.push(this.quizService.edit(quiz));
      } else {
        p.push(this.quizService.create(quiz).then(q => this.form.controls.rightPanel.patchValue({quiz: q._id})));
      }
    }
    return Promise.all(p);
  }

  onSubmit() {
    this.authService.getToken().then(() => this.updateForm()).then(() => {
      Object.assign(this.topic, this.form.value);
      if (this.leftPanelType === 'quiz') {
        this.topic.leftPanel.quiz = this.form.value.leftPanel.quiz;
      } else {
        this.topic.leftPanel.quiz = null;
      }
      if (this.rightPanelType === 'quiz') {
        this.topic.rightPanel.quiz = this.form.value.rightPanel.quiz;
      } else {
        this.topic.rightPanel.quiz = null;
      }

      if (this.isCreation) {
        this.topicService.create(this.topic).then(() => this.location.back());
      } else {
        this.topicService.edit(this.topic).then(() => this.location.back());
      }
    });
  }

  addHashtag(event: MatChipInputEvent, array: string) {
    if ((event.value || '').trim()) {
      this.form.get(array).value.push(event.value.trim());
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  removeHashtag(tag: string, array: string) {
    const index = this.form.get(array).value.indexOf(tag);
    if (index >= 0) {
      this.form.get(array).value.splice(index, 1);
    }
  }
}
