import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {environment as env} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => UploadInputComponent)}
  ]
})
export class UploadInputComponent implements OnInit, ControlValueAccessor {

  filePath = '';
  isUploading = false;
  isError = false;
  errorMsg = '';
  host = env.mediaHost;
  uploadProgress = 0;

  @Input() name = 'Image';

  @Output() uploadStart = new EventEmitter();
  @Output() uploadStop = new EventEmitter();

  propagateChange: any = () => {};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onChange(event) {
    const uploadData = new FormData();
    if (event.target.files[0].size >= 1e9) {
      this.dialog.open(DialogComponent, {data: {
        title: 'Uploading error !',
        content: 'Can\'t upload file larger than 1Gb ! Please contact the administrator if this is a problem.'
      }});
      return;
    }
    uploadData.append('media', event.target.files[0], event.target.files[0].name);
    this.uploadStart.emit();
    this.authService.getToken().then(token => {
      if (token) {
        this.upload(uploadData);
      }
    });
  }

  upload(uploadData: FormData) {
    this.http.post(env.apiUrl + 'media?quality=80', uploadData, {reportProgress: true, observe: 'events'}).subscribe((r: any) => {
      if (r.type === HttpEventType.UploadProgress) {
        this.uploadProgress = r.loaded * 100 / r.total;
        this.isUploading = true;
        this.isError = false;
      } else if (r.type === HttpEventType.Response) {
        this.uploadStop.emit();
        this.isUploading = false;
        this.isError = false;
        this.filePath = r.body.filename;
        this.propagateChange(this.filePath);
      }
    }, (err: HttpErrorResponse) => {
      this.uploadStop.emit();
      this.isUploading = false;
      this.isError = true;
      this.errorMsg = err.error;
      this.dialog.open(DialogComponent, {data: {
          title: 'Uploading error !',
          content: 'The file was not uploaded due to an error. Please contact the administrator with the following error: '
            + JSON.stringify(this.errorMsg)
        }});
    });
  }

  writeValue(obj: any): void {
    this.filePath = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
