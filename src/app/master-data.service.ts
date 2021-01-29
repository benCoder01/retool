import {Injectable} from '@angular/core';
import {Address, Company} from './types';
import {Observable, of} from 'rxjs';
import {company1, company2} from './dummyData';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  masterData: Company[];
  emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() {
    this.masterData = [company2, company1];
  }

  createRecord(c: Company): Observable<number> {
    c.id = Date.now();

    // TODO: Set Creditor and Debitor numbers!

    if (this.verifyCompany(c)) {
      this.masterData.push(c);
      return of(c.id);
    }
    return of(0);
  }

  getRecordByID(id: number): Observable<Company> {
    let company: Company;

    this.masterData.forEach(c => {
      if (c.id === id) {
        company = c;
      }
    });
    return of(company);
  }

  searchRecordByName(name: string): Observable<Company[]> {
    const res: Company[] = [];

    this.masterData.forEach(c => {
      if (c.name.startsWith(name)) {
        res.push(c);
      }
    });

    return of(res);
  }

  getMasterRecords(): Observable<Company[]> {
    return of(this.masterData);
  }

  deleteMasterRecord(c: Company): Observable<number> {
    for (let i = 0; i < this.masterData.length; i++) {
      if (c.id === this.masterData[i].id) {
        this.masterData.splice(i, 1);
        return of(c.id);
      }
    }
    return of(-1);
  }

  editMasterRecord(c: Company): Observable<number> {
    for (let i = 0; i < this.masterData.length; i++) {
      if (c.id === this.masterData[i].id) {
        this.masterData[i] = c;
        return of(c.id);
      }
    }
    return of(-1);
  }

  // TODO: Write Test for verifyExistance()
  verifyExistance(c: Company): Observable<boolean> {
    let equality = false;
    this.getRecordByID(c.id).subscribe((res: Company) => {
      // TODO: Compare every property
      if (res) {
        equality = (c.name === res.name && c.eMail === res.eMail);
      }
    });
    return of(equality);
  }

  private verifyCompany(c: Company): boolean {
    // TODO: Validate Company Date (esp. IBAN)
    return this.emailRegex.test(c.eMail) && this.verifyAddress(c.address);
  }

  private verifyAddress(a: Address): boolean {
    // TODO: Verify postbox addresses
    if (!a) {
      return false;
    }
    return !(a.company === '' || a.careOf === '' || a.street === '' || a.zipcode === '' || a.town === '' || a.country === '');
  }
}
