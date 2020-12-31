import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Address, Company} from '../../types';
import {MasterDataService} from '../../master-data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-master-record-dialog',
  templateUrl: './edit-master-record-dialog.component.html',
  styleUrls: ['./edit-master-record-dialog.component.css']
})
export class EditMasterRecordDialogComponent implements OnInit {

  company: Company;
  bankDisabled = false;
  generalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  bankFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { c: Company },
              private dialogRef: MatDialogRef<any>,
              private masterRecordService: MasterDataService) {

  }

  ngOnInit(): void {
    this.company = this.data.c;
    this.generalFormGroup = new FormGroup({
      nameControl: new FormControl(this.company.name, Validators.required),
      mailControl: new FormControl(this.company.eMail, [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required])
    });

    this.addressFormGroup = new FormGroup({
      companyControl: new FormControl(this.company.address.company, Validators.required),
      careOfControl: new FormControl(this.company.address.careOf),
      streetControl: new FormControl(this.company.address.street, Validators.required),
      zipcodeControl: new FormControl(this.company.address.zipcode, Validators.required),
      townControl: new FormControl(this.company.address.town, Validators.required),
      countryControl: new FormControl(this.company.address.country, Validators.required),
    });

    this.bankFormGroup = new FormGroup({
      ibanControl: new FormControl({
        value: this.company.iban,
        disabled: this.bankDisabled
      }, Validators.pattern(/[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/)),
      swiftControl: new FormControl({value: this.company.swift, disabled: this.bankDisabled}),
      nameControl: new FormControl({value: this.company.bankName, disabled: this.bankDisabled}),
      vatIdControl: new FormControl({value: this.company.vatId, disabled: this.bankDisabled}),
    });
  }

  toggleBank(): void {
    this.bankDisabled = !this.bankDisabled;
    if (this.bankDisabled) {
      this.bankFormGroup.disable();
    } else {
      this.bankFormGroup.enable();
    }
  }

  getEmailErrorMessage(): string {
    if (this.generalFormGroup.get('mailControl').hasError('required')) {
      return 'You must enter a value';
    } else if (this.generalFormGroup.get('mailControl').hasError('pattern')) {
      return 'Not a valid email';
    }
    return '';
  }

  getIbanErrorMessage(): string {
    if (this.bankFormGroup.get('ibanControl').hasError('pattern')) {
      return 'IBAN not valid';
    } else if (this.bankFormGroup.get('ibanControl').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onFormSubmit(): void {
    if (!this.bankFormGroup.valid && !this.bankFormGroup.disabled) {
      return;
    }

    const address: Address = {
      postbox: false,
      country: this.addressFormGroup.get('countryControl').value,
      town: this.addressFormGroup.get('townControl').value,
      zipcode: this.addressFormGroup.get('zipcodeControl').value,
      street: this.addressFormGroup.get('streetControl').value,
      careOf: this.addressFormGroup.get('careOfControl').value,
      company: this.addressFormGroup.get('companyControl').value
    };

    let c: Company;

    if (!this.bankDisabled) {
      c = {
        id: this.company.id,
        debitorID: this.company.debitorID,
        creditorID: this.company.creditorID,
        name: this.generalFormGroup.get('nameControl').value,
        eMail: this.generalFormGroup.get('mailControl').value,
        address,
        iban: this.bankFormGroup.get('ibanControl').value,
        vatId: this.bankFormGroup.get('vatIdControl').value,
        swift: this.bankFormGroup.get('swiftControl').value,
        bankName: this.bankFormGroup.get('nameControl').value
      };
    } else {
      c = {
        id: this.company.id,
        debitorID: this.company.debitorID,
        creditorID: this.company.creditorID,
        name: this.generalFormGroup.get('nameControl').value,
        eMail: this.generalFormGroup.get('mailControl').value,
        address,
        iban: '',
        vatId: '',
        swift: '',
        bankName: ''
      };
    }

    this.masterRecordService.editMasterRecord(c).subscribe(result => this.dialogRef.close(result));

  }
}
