import {TestBed} from '@angular/core/testing';

import {InvoiceService} from './invoice.service';
import {Invoice, Pile} from './types';
import {subscribeOn} from 'rxjs/operators';
import {invoice1} from './dummyData';


describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a pile', () => {
    service.createPile('TestPile').subscribe((res: string) => {
      expect(res).not.toBe('');
    });
  });

  it('should get a pile with the id', () => {
    service.createPile('Test Pile').subscribe((id: string) => {
      service.openPile(id).subscribe((pile: Pile) => {
        expect(pile.name).toBe('Test Pile');
      });
    });
  });

  it('should not return wrong id pile', () => {
    service.createPile('Test Pile').subscribe((id: string) => {
      service.openPile('id').subscribe((pile: Pile) => {
        expect(pile).toBeFalsy();
      });
    });
  });

  it('should delete a created pile', () => {
    service.createPile('Test').subscribe((id: string) => {
      service.deletePile(id).subscribe((deleteId: string) => {
        expect(deleteId).toBe(id);
      });
    });
  });

  it('should error when deleting wrong id', () => {
    service.deletePile('test').subscribe((id: string) => {
      expect(id).toBe('');
    });
  });

  it('should add an invoice', () => {
    service.createPile('Test').subscribe((id: string) => {
      service.createInvoice(id, invoice1).subscribe((res: number) => {
        expect(res).toBe(invoice1.number);
      });
    });
  });

  it('should not add invoice with missing bank', () => {
    service.createPile('Test').subscribe((id: string) => {
      const tempInvoice: Invoice = {
        ...invoice1
      };

      tempInvoice.sender.bankName = '';
      tempInvoice.sender.iban = '';
      tempInvoice.sender.swift = '';
      tempInvoice.sender.vatId = '';
      service.createInvoice(id, tempInvoice).subscribe((res: number) => {
        expect(res).toBe(-1);
      });
    });
  });

  it('should delete an invoice', () => {
    service.createPile('Test').subscribe((id: string) => {
      service.createInvoice(id, invoice1).subscribe((res: number) => {
        service.deleteInvoice('Test', res).subscribe((res2: number) => {
          expect(res2).toBeGreaterThan(0);
        });
      });
    });
  });

  it('should not delete non existing invoice', () => {
    service.createPile('Test').subscribe((id: string) => {
      service.createInvoice(id, invoice1).subscribe((res: number) => {
        service.deleteInvoice('Test', res + 1).subscribe((res2: number) => {
          expect(res2).toBe(-1);
        });
      });
    });
  });

});
