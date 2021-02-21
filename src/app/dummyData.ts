import {Company, Invoice} from './types';



export const company1: Company = {
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

export const company2: Company = {
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
  id: 1,
};

export const company3: Company = {
  name: 'Peter GmbH',
  address: {
    company: 'Test GmbH',
    careOf: 'Example Person',
    street: 'Example Street 123',
    zipcode: '12345',
    town: 'Example Town',
    country: 'Germany',
    postbox: false
  },
  eMail: 'buha@peter.de',
  iban: 'DE35733338154759498353',
  bankName: 'Test Bank',
  swift: 'LOYDCHGGZCH',
  vatId: 'DE 136695978',
  id: 2,
};

export const emptyCompany: Company = {
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

export const invoice1: Invoice = {
  sender: company1,
  recipient: company2,
  invoiceDate: new Date(),
  number: 1,
  dateOfService: '27.01.2021',
  positions: [{name: 'Organisationspauschale', value: 200, tax: 0.19, currency: '€'}],
  addition: 'Bestellnummer: 1231'
};

export const invoice2: Invoice = {
  sender: company1,
  recipient: company3,
  invoiceDate: new Date(),
  number: 597877897,
  dateOfService: '28.01.2021',
  positions: [{name: 'Organisationspauschale', value: 200, tax: 0.19, currency: '€'}],
  addition: 'Bestellnummer: 1231'
};
