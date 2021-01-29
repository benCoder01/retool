import {TestBed} from '@angular/core/testing';

import {MasterDataService} from './master-data.service';
import {Company} from './types';
import {company1 as company, emptyCompany} from './dummyData';

describe('MasterDataService', () => {
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a new record', () => {
    const id = service.createRecord(company).subscribe((id: number) => {
      expect(id).toBeGreaterThan(0);
    });
  });

  it('should not save empty record', () => {
    service.createRecord(emptyCompany).subscribe((id: number) => {
      expect(id).toBe(0);
    });
  });

  it('should not save record with wrong iban', () => {
    const ibanTemp = company.iban;
    company.iban = 'DE1234';
    service.createRecord(company).subscribe((id: number) => {
      company.iban = ibanTemp;
      expect(id).toBe(0);
    });
  });

  it('should not save record with wrong email', () => {
    const eMailTemp = company.eMail;
    company.eMail = 'asdasd@';
    service.createRecord(company).subscribe((id: number) => {
      company.eMail = eMailTemp;
      expect(id).toBe(0);
    });

  });

  it('should find record by id', () => {
    service.createRecord(company).subscribe((id: number) => {
      service.getRecordByID(id).subscribe((res: Company) => {
        expect(res.name).toBe(company.name);

      });
    });
  });

  it('should find record by first letter of name', () => {
    service.createRecord(company).subscribe(() => {
      service.searchRecordByName(company.name.substr(0, 1)).subscribe((c: Company[]) => {
        expect(c[0].name).toBe(company.name);

      });
    });
  });
});
