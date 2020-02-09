import {Component, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient, HttpEventType} from '@angular/common/http';

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

  @Input() name = 'Image';

  propagateChange: any = () => {};

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onChange(event) {
    const uploadData = new FormData();
    uploadData.append('media', event.target.files[0], event.target.files[0].name);
    this.http.post('http://localhost:9000/media?quality=80', uploadData, {reportProgress: true, observe: 'events'}).subscribe((r: any) => {
      if (r.type === HttpEventType.UploadProgress) {
        this.isUploading = true;
      } else if (r.type === HttpEventType.Response) {
        this.isUploading = false;
        this.filePath = r.body.filename;
        this.propagateChange(this.filePath);
      }
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
