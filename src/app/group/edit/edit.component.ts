import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsGroup} from '../../models/newsgroup.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../group.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {NewsItem} from '../../models/newsitem.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class GroupEditComponent implements OnInit {
  form: FormGroup;
  group: NewsGroup;
  coverImage = null;
  isCreation: boolean;
  isLoading = true;
  isUploading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private navbarService: NavbarService,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New' : 'Edit');

      if (this.isCreation) {
        this.group = new NewsGroup();
        this.initForm();
      } else {
        this.groupService.get(id).then((group: NewsGroup) => {
          this.group = group;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      date: [this.group.date || '', [Validators.required]],
      content: [this.group.content || '', [Validators.required]],
      image: [this.group.image || '', [Validators.required]],
      items: this.fb.array(this.group.items.map(item => this.fb.group({
        title: [item.title || '', [Validators.required]],
        content: [item.content || '', [Validators.required]],
        image: [item.image || '', [Validators.required]],
        videoLeft: [item.videoLeft || '', [Validators.required]],
        videoRight: [item.videoRight || '', [Validators.required]],
      })))
    });
    this.isLoading = false;
  }

  get items() { return this.form.get('items') as FormArray; }

  addItem() {
    this.items.push(this.fb.group({
      title: '',
      content: '',
      image: '',
      videoLeft: '',
      videoRight: '',
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onCoverImageChange(event) {
    this.coverImage = event.target.files[0];
    this.form.patchValue({image: this.coverImage.name});
    this.form.markAsDirty();
  }

  uploadCoverImage() {
    return new Promise(resolve => {
      const uploadData = new FormData();
      uploadData.append('cover', this.coverImage, this.coverImage.name);
      this.http.post('http://localhost:9000/news/upload', uploadData).subscribe((r: any) => {
        this.form.patchValue({image: r.fileName});
        resolve();
      });
    });
  }

  updateGroup() {
    Object.assign(this.group, this.form.value);
    if (this.isCreation) {
      this.groupService.create(this.group).then(model => {
        this.location.back();
      });
    } else {
      this.groupService.edit(this.group).then(() => {
        this.location.back();
      });
    }
  }

  onSubmit() {
    this.isUploading = true;
    if (this.coverImage) {
      this.uploadCoverImage().then(() => this.updateGroup());
    } else {
      this.group.image = '';
      this.updateGroup();
    }
  }
}
