import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Company} from '../../types';
import {MasterDataService} from '../../master-data.service';

@Component({
  selector: 'app-delete-master-record-dialog',
  templateUrl: './delete-master-record-dialog.component.html',
  styleUrls: ['./delete-master-record-dialog.component.css']
})
export class DeleteMasterRecordDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { c: Company }, private dialogRef: MatDialogRef<any>, private masterRecordService: MasterDataService) {
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.masterRecordService.deleteMasterRecord(this.data.c).subscribe((result: number) => {
      this.dialogRef.close(result);
    });
  }

}
