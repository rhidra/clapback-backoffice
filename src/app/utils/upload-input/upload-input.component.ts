import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

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
    this.http.post('http://localhost:9000/media?quality=80', uploadData, {reportProgress: true, observe: 'events'}).subscribe((r: any) => {
      if (r.type === HttpEventType.UploadProgress) {
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
