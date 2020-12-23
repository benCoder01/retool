import {TestBed} from '@angular/core/testing';

import {MasterDataService} from './master-data.service';
import {Company} from './types';

describe('MasterDataService', () => {
  let service: MasterDataService;
  const company: Company = {
    name: 'Test GmbH',
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
  };

  const emptyCompany: Company = {
    name: '',
    address: {
      company: '',
      careOf: '',
      street: '',
      zipcode: '',
      town: '',
      country: '',
      postbox: false
    },
    eMail: '',
    iban: '',
    bankName: '',
    swift: '',
    vatId: '',
    id: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a new record', () => {
    const id = service.createRecord(company);
    expect(id).toBeGreaterThan(0);
  });

  it('should not save empty record', () => {
    const id = service.createRecord(emptyCompany);
    expect(id).toBe(0);
  });

  it('should not save record with wrong iban', () => {
    const ibanTemp = company.iban;
    company.iban = 'DE1234';
    const id = service.createRecord(company);
    company.iban = ibanTemp;

    expect(id).toBe(0);
  });

  it('should not save record with wrong email', () => {
    const eMailTemp = company.eMail;
    company.eMail = 'asdasd@';
    const id = service.createRecord(company);
    company.eMail = eMailTemp;

    expect(id).toBe(0);
  });

  it('should find record by id', () => {
    const id = service.createRecord(company);
    const res = service.getRecordByID(id);

    expect(res.name).toBe(company.name);
  });

  it('should find record by first letter of name', () => {
    const id = service.createRecord(company);
    const res = service.searchRecordByName(company.name.substr(0, 1));

    expect(res[0].name).toBe(company.name);
  });
});
