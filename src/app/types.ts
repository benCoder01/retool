export interface Invoice {
  sender: Company;
  recipient: Company;
  invoiceDate: Date;
  number: string;
  dateOfService: Date;
  eventName?: Event;
  positions: InvoicePosition[];
  addition: string;
}

export interface Company {
  id?: number;
  name: string;
  address: Address;
  eMail: string;
  iban: string;
  swift: string;
  vatId: string;
  bankName: string;
}

export interface InvoicePosition {
  name: string;
  value: number;
  tax: number;
  currency: string;
}

export interface Address {
  company: string;
  careOf: string;
  street: string;
  zipcode: string;
  town: string;
  country: string;
  postbox: boolean; // TODO: Test if fields can be used for postbox
}

export interface Event {
  name: string;
  date: Date;
}
