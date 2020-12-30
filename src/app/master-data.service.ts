import {Injectable} from '@angular/core';
import {Address, Company} from './types';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  masterData: Company[];
  emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() {
    this.masterData = [{
      name: 'Dummy GmbH',
      address: {
        company: 'Test GmbH',
        careOf: 'Example Person',
        street: 'Example Street 123',
        zipcode: '12345',
        town: 'Example Town',
        country: 'Germany',
        postbox: false
      },
      eMail: 'buha@testgmbh.de',
      iban: 'DE35733338154759498353',
      bankName: 'Test Bank',
      swift: 'LOYDCHGGZCH',
      vatId: 'DE 136695978',
      id: 0,
    }];
  }

  createRecord(c: Company): Observable<number> {
    c.id = Date.now();

    // TODO: Set Creditor and Debitor numbers!

    if (this.verifyCompany(c)) {
      this.masterData.push(c);
      return of(c.id);
    }
    return  of(0);
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
