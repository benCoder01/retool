import {Injectable} from '@angular/core';
import {Address, Company} from './types';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  masterData: Company[];
  emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() {
    this.masterData = [];
  }

  createRecord(c: Company): number {
    c.id = Date.now();
    if (this.verifyCompany(c)) {
      this.masterData.push(c);
      return c.id;
    }
    return 0;
  }

  getRecordByID(id: number): Company {
    let company: Company;

    this.masterData.forEach(c => {
      if (c.id === id) {
        company = c;
      }
    });
    return company;
  }

  searchRecordByName(name: string): Company[] {
    const res: Company[] = [];

    this.masterData.forEach(c => {
      if (c.name.startsWith(name)) {
        res.push(c);
      }
    });

    return res;
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
