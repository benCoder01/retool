import {Injectable} from '@angular/core';
import {Invoice, Pile} from './types';
import * as uuid from 'uuid';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  piles: Map<string, Pile>;
  pileIDs: string[];

  constructor() {
  }

  createPile(name: string): Observable<string> {
    const id = uuid.v4();
    this.piles.set(id, {id, name, invoices: []});
    this.pileIDs.push(id);
    return of(id);
  }

  getPiles(): Observable<Map<string, Pile>> {
    return of(this.piles);
  }

  openPile(id: string): Observable<Pile> {
    return of(this.piles.get(id));
  }

  deletePile(id: string): Observable<string> {
    this.piles.delete(id);
    for (let i = 0; i < this.pileIDs.length; i++) {
      if (id === this.pileIDs[i]) {
        this.pileIDs.splice(i, 1);
        return of(id);
      }
    }
    return of('');
  }

  createInvoice(pileId: string, invoice: Invoice): Observable<string> {
    if (!this.verifyInvoice(invoice)) {
      return of('');
    }
    const pile = this.piles.get(pileId);
    if (!pile) {
      return of('');
    }

    pile.invoices.push(invoice);
    this.piles.set(pileId, pile);
  }

  getUnusedInvoiceNumber(): Observable<number> {
    let latest = 1;

    while (this.isInvoiceNumberUsed(latest)) {
      latest++;
    }
    return of(latest);
  }

  private isInvoiceNumberUsed(num: number): boolean {
    this.piles.forEach((pile: Pile) => {
      pile.invoices.forEach((invoice: Invoice) => {
        if (invoice.number === num) {
          return true;
        }
      });
    });
    return false;
  }

  deleteInvoice(pileId: string, invoiceNumber: number): Observable<number> {
    const pile = this.piles.get(pileId);
    if (!pile) {
      return of(0);
    }

    pile.invoices.forEach((invoice: Invoice, key: number) => {
      if (invoice.number === invoiceNumber) {
        pile.invoices.splice(key, 1);
        return of(invoiceNumber);
      }
    });
    return of(0);
  }

  private verifyInvoice(invoice: Invoice): boolean {
    return true;
  }
}
