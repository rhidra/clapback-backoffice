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

  get items() { return this.form.get('items') as FormArray; }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private topicService: TopicService,
    private navbarService: NavbarService,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New' : 'Edit', null, '', null, [], null, () => this.location.back());

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
      hashtag: [this.topic.hashtag || ''],
      approved: [this.topic.approved || false],

      centerPanel: this.fb.group({
        video: [this.topic.centerPanel.video || ''],
        author: [this.topic.centerPanel.author || this.authService.user._id, [Validators.required]],
      }),

      leftPanel: this.fb.group({
        video: [this.topic.leftPanel.video || ''],
        text: [this.topic.leftPanel.text || ''],
        image: [this.topic.leftPanel.image || ''],
        quiz: [this.topic.leftPanel.quiz || ''],
        author: [this.topic.leftPanel.author || this.authService.user._id, [Validators.required]],
      }),

      rightPanel: this.fb.group({
        video: [this.topic.rightPanel.video || ''],
        text: [this.topic.rightPanel.text || ''],
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

  onSubmit() {
    if (this.leftPanelType === 'video') {
      this.form.controls.leftPanel.patchValue({text: null, image: null, quiz: null});
    } else if (this.leftPanelType === 'text') {
      this.form.controls.leftPanel.patchValue({video: null, quiz: null});
    } else {
      this.form.controls.leftPanel.patchValue({text: null, image: null, video: null});
    }
    if (this.rightPanelType === 'video') {
      this.form.controls.rightPanel.patchValue({text: null, image: null, quiz: null});
    } else if (this.rightPanelType === 'text') {
      this.form.controls.rightPanel.patchValue({video: null, quiz: null});
    } else {
      this.form.controls.rightPanel.patchValue({text: null, image: null, video: null});
    }

    // TODO: Remove the following lines when the quiz form is done
    this.form.controls.leftPanel.patchValue({quiz: null});
    this.form.controls.rightPanel.patchValue({quiz: null});

    Object.assign(this.topic, this.form.value);
    if (this.isCreation) {
      this.topicService.create(this.topic).then(() => this.location.back());
    } else {
      this.topicService.edit(this.topic).then(() => this.location.back());
    }
  }
}
