export interface Invoice {
  sender: Company;
  recipient: Company;
  invoiceDate: Date;
  number: number; // unique id
  dateOfService: string; // should be string of Dates for longer periods of service
  eventName?: string;
  positions: InvoicePosition[];
  addition: string; // e.g. Order number
}
// TODO: Init Config in Configuration service
export interface Configuration {
  invoiceNumberPrefix: string;
  invoiceNumberSuffixLength: number;
}

export interface Company {
  id?: number;
  name: string;
  debitorID?: number;
  creditorID?: number;
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

export interface Pile {
  id: string; // uuid
  name: string;
  invoices: Invoice[];
}



