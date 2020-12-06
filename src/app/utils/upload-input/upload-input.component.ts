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
  uploadProgress = 0;

  @Input() name = 'Image';
  @Input() type: 'video' | 'image' = 'image';

  @Output() uploadStart = new EventEmitter();
  @Output() uploadStop = new EventEmitter();

  propagateChange: any = () => {};
  propagateTouch: any = () => {};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onChange(event) {
    this.propagateTouch();
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
    await this.authService.getToken();
    const filename = await this.allocateFilename(event.target.files[0].name);
    uploadData.append('filename', filename);
    this.upload(uploadData, filename);
  }

  // filename: name of the video/image with extension
  allocateFilename(filename: string): Promise<string> {
    return new Promise(resolve => {
      this.http.post(env.apiUrl + `media/alloc/${filename}`, {}).subscribe(({filename}: any) => resolve(filename));
    });
  }

  upload(uploadData: FormData, filename: string) {
    this.http.post(env.apiUrl + 'media?quality=80', uploadData, {reportProgress: true, observe: 'events'}).subscribe((r: any) => {
      if (r.type === HttpEventType.UploadProgress) {
        this.uploadProgress = r.loaded * 100 / r.total;
        this.isUploading = true;
        this.isError = false;
      } else if (r.type === HttpEventType.Response) {
        this.uploadStop.emit();
        this.isUploading = false;
        this.isError = false;
        this.filePath = filename;
        this.propagateChange(filename);
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

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
}
