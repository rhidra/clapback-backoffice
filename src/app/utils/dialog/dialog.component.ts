import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {

  title: string;
  content: string;
  isChoice: boolean;
  lockUser: boolean;
  input: string;
  value: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isChoice = data.isChoice || !!data.input;
    this.lockUser = !!data.lockUser;
    this.title = data.title;
    this.content = data.content;
    this.input = data.input;
    this.value = '';
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    if (this.input) {
      this.dialogRef.close(this.value);
    } else {
      this.dialogRef.close(true);
    }
  }
}
