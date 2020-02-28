import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TopicService} from '../topic.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {Location} from '@angular/common';
import {Topic} from '../../models/topic.model';
import {AuthService} from '../../auth/auth.service';

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

  get items() { return this.form.get('items') as FormArray; }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private groupService: TopicService,
    private navbarService: NavbarService,
    private location: Location,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New' : 'Edit');

      if (this.isCreation) {
        this.topic = new Topic();
        this.leftPanelType = 'video';
        this.rightPanelType = 'video';
        this.initForm();
      } else {
        this.groupService.get(id).then((topic: Topic) => {
          this.topic = topic;
          this.leftPanelType = this.topic.leftPanel.quiz ? 'quiz' : this.topic.leftPanel.text ? 'text' : 'video';
          this.rightPanelType = this.topic.rightPanel.quiz ? 'quiz' : this.topic.rightPanel.text ? 'text' : 'video';
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      date: [this.topic.date || '', [Validators.required]],
      title: [this.topic.title || '', [Validators.required]],
      video: [this.topic.video || '', [Validators.required]],
      author: [this.topic.author || '', [Validators.required]],
      hashtag: [this.topic.hashtag || ''],
      approved: [this.topic.approved || false],

      leftPanel: this.fb.group({
        video: [this.topic.leftPanel.video || ''],
        text: [this.topic.leftPanel.text || ''],
        image: [this.topic.leftPanel.image || ''],
        quiz: [this.topic.leftPanel.quiz || ''],
      }),

      rightPanel: this.fb.group({
        video: [this.topic.rightPanel.video || ''],
        text: [this.topic.rightPanel.text || ''],
        image: [this.topic.rightPanel.image || ''],
        quiz: [this.topic.rightPanel.quiz || ''],
      }),
    });
    this.isLoading = false;
  }

  onSubmit() {
    // TODO
    /*
    const rejectedItems = this.group.items.filter(item => !this.form.value.items.map(i => i._id).includes(item._id));
    Object.assign(this.group, this.form.value);
    if (this.isCreation) {
      this.groupService.create(this.group).then(() => this.location.back());
    } else {
      this.groupService.edit(this.group, rejectedItems).then(() => this.location.back());
    }
    */
  }
}
