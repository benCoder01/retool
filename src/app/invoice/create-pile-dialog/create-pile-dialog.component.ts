import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InvoiceService} from '../../invoice.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-pile-dialog',
  templateUrl: './create-pile-dialog.component.html',
  styleUrls: ['./create-pile-dialog.component.css']
})
export class CreatePileDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nameControl: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.dialogRef.close(this.formGroup.get('nameControl').value);
  }

}
