import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatDialogRef} from '@angular/material/dialog';
import {Address, Company} from '../../types';
import {MasterDataService} from '../../master-data.service';

@Component({
  selector: 'app-create-master-record-dialog',
  templateUrl: './create-master-record-dialog.component.html',
  styleUrls: ['./create-master-record-dialog.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateMasterRecordDialogComponent implements OnInit {

  bankDisabled = false;
  generalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  bankFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<any>, private masterDataService: MasterDataService) {
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

    let company: Company;

    if (!this.bankDisabled) {
      company = {
        name: this.generalFormGroup.get('nameControl').value,
        eMail: this.generalFormGroup.get('mailControl').value,
        address,
        iban: this.bankFormGroup.get('ibanControl').value,
        vatId: this.bankFormGroup.get('vatIdControl').value,
        swift: this.bankFormGroup.get('swiftControl').value,
        bankName: this.bankFormGroup.get('nameControl').value
      };
    } else {
      company = {
        name: this.generalFormGroup.get('nameControl').value,
        eMail: this.generalFormGroup.get('mailControl').value,
        address,
        iban: '',
        vatId: '',
        swift: '',
        bankName: ''
      };
    }

    this.masterDataService.createRecord(company).subscribe((res: number) => {
      if (res === 0) {
        this.dialogRef.close(-1);
      }
      this.dialogRef.close(res);
    });
  }

  ngOnInit(): void {
    this.generalFormGroup = new FormGroup({
      nameControl: new FormControl('', Validators.required),
      mailControl: new FormControl('', [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required])
    });

    this.addressFormGroup = new FormGroup({
        companyControl: new FormControl('', Validators.required),
      careOfControl: new FormControl(''),
      streetControl: new FormControl('', Validators.required),
      zipcodeControl: new FormControl('', Validators.required),
      townControl: new FormControl('', Validators.required),
      countryControl: new FormControl('', Validators.required),
    });

    this.bankFormGroup = new FormGroup({
      ibanControl: new FormControl({
        value: '',
        disabled: this.bankDisabled
      }, Validators.pattern(/[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/)),
      swiftControl: new FormControl({value: '', disabled: this.bankDisabled}),
      nameControl: new FormControl({value: '', disabled: this.bankDisabled}),
      vatIdControl: new FormControl({value: '', disabled: this.bankDisabled}),
    });
  }

}
