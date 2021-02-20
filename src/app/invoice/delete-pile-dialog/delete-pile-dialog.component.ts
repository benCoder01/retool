import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pile-dialog',
  templateUrl: './delete-pile-dialog.component.html',
  styleUrls: ['./delete-pile-dialog.component.css']
})
export class DeletePileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, private dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dialogRef.close(1);
  }

}
