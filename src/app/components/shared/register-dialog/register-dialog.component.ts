import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { RegisterService } from './../../../services/register.service';
import * as FileSaver from 'file-saver';

export interface DialogData {
  userId: number;
  name: string;
  resellerCode: string;
  orderCode: string;
}

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  isCopied = false;
  constructor(
  private _clipboardService: ClipboardService,
  public dialogRef: MatDialogRef<RegisterDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, private registerService: RegisterService) { }

  ngOnInit() {
  }


  copyData() {
    this.isCopied = true;
    const textData = document.getElementById('container').textContent;
    this._clipboardService.copyFromContent(textData);
  }

  download() {
    this.registerService.getFile(this.data.userId).
    subscribe(response => {
      FileSaver.saveAs(response, `${this.data.resellerCode}-${this.data.orderCode}.pdf`);
    });
  }

}
