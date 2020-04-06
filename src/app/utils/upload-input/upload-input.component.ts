import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {environment as env} from '../../../environments/environment';

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
  ) { }

  ngOnInit() {
  }

  onChange(event) {
    const uploadData = new FormData();
    uploadData.append('media', event.target.files[0], event.target.files[0].name);
    this.uploadStart.emit();
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
