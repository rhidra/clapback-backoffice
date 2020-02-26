import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-datetimepicker-input',
  templateUrl: './datetimepicker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatetimepickerComponent), multi: true},
  ],
})
export class DatetimepickerComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;

  propagateChange: any = () => {};

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {}

  onChange() {
    const [hour, min] = this.form.value.time.split(':');
    const result = moment(this.form.value.date).hour(hour).minute(min).format();
    this.propagateChange(result);
  }

  writeValue(obj: any): void {
    const time = moment(obj).isValid() ? moment(obj).hour() + ':' + moment(obj).minute() : '';
    this.form = this.fb.group({
      date: [obj || '', [Validators.required]],
      time: [time || '08:00', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => this.onChange());
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
