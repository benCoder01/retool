import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MasterDataService} from '../../master-data.service';
import {Company} from '../../types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-invoice-dialog',
  templateUrl: './create-invoice-dialog.component.html',
  styleUrls: ['./create-invoice-dialog.component.css']
})
export class CreateInvoiceDialogComponent implements OnInit {

  generalFormGroup: FormGroup;
  positionsFormGroup: FormGroup;
  companies: Company[];

  filteredSender: Observable<Company[]>;
  filteredReceiver: Observable<Company[]>;

  constructor(private masterRecordService: MasterDataService) {
  }

  ngOnInit(): void {
    this.fetchCompanies();
    this.generalFormGroup = new FormGroup({
      senderControl: new FormControl(),
      receiverControl: new FormControl(),
      dateControl: new FormControl(),
      dateOfServiceControl: new FormControl(),
      numberControl: new FormControl(),
      additionControl: new FormControl()
    });

    this.positionsFormGroup = new FormGroup({});

    this.filteredSender = this.generalFormGroup.get('senderControl').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCompany(name) : this.companies.slice()),
    );
    this.filteredReceiver = this.generalFormGroup.get('receiverControl').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCompany(name) : this.companies.slice())
    );
  }

  private _filterCompany(name: string): Company[] {
    const filterValue = name.toLowerCase();
    return this.companies.filter(c => c.name.toLowerCase().includes(filterValue));
  }

  displayCompanyFn(c: Company): string {
    return c && c.name ? c.name : '';
  }

  fetchCompanies(): void {
    this.masterRecordService.getMasterRecords().subscribe((res: Company[]) => {
      this.companies = res;
    });
  }
}
