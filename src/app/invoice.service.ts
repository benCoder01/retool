import {Injectable} from '@angular/core';
import {Invoice, InvoicePosition, Pile} from './types';
import * as uuid from 'uuid';
import {Observable, of} from 'rxjs';
import {MasterDataService} from './master-data.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // TODO: Test Invoice Service
  piles: Map<string, Pile>;
  pileIDs: string[];

  constructor(private masterRecord: MasterDataService) {
    this.piles = new Map<string, Pile>();
    this.pileIDs = [];
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

  // TODO: Add Testing
  getPileIDs(): Observable<string[]> {
    return of(this.pileIDs);
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

  createInvoice(pileId: string, invoice: Invoice): Observable<number> {
    if (!this.verifyInvoice(invoice)) {
      return of(-1);
    }
    const pile = this.piles.get(pileId);
    if (!pile) {
      return of(-1);
    }

    pile.invoices.push(invoice);
    this.piles.set(pileId, pile);

    return of(invoice.number);
  }

  generateFullInvoiceNumber(n: number): string {
    // TODO:
    return '' + n;
  }

  getUnusedInvoiceNumber(): Observable<number> {
    let latest = 1;

    while (this.isInvoiceNumberUsed(latest)) {
      latest++;
    }
    return of(latest);
  }

  private isInvoiceNumberUsed(num: number): boolean {
    for (let i = 0; i < this.pileIDs.length; i++) {
      let pile = this.piles.get(this.pileIDs[i]);
      if (pile.invoices.findIndex(invoice => invoice.number === num) !== -1) {
        return true;
      }
    }
    return false;
  }

  deleteInvoice(pileId: string, invoiceNumber: number): Observable<number> {
    const pile = this.piles.get(pileId);
    if (!pile) {
      return of(0);
    }
    let index = pile.invoices.findIndex(invoice => invoice.number === invoiceNumber);
    if (index === -1) {
      return of(undefined);
    }
    pile.invoices.splice(index, 1);
    return of(invoiceNumber);
  }

  updateInvoice(pileID: string, invoiceNumber: number, invoice: Invoice): number {
    invoice.number = invoiceNumber;
    let pile: Pile;
    this.openPile(pileID).subscribe(res => pile = res);
    if (!pile || !this.verifyInvoice(invoice)) {
      return 0;
    }

    let oldIndex = pile.invoices.findIndex(invoice => invoice.number === invoiceNumber);
    pile.invoices[oldIndex] = invoice;
    this.piles.set(pileID, pile);
    return invoiceNumber;
  }

  getInvoice(invoiceNumber: number, pileID: string): Observable<Invoice> {
    const pile = this.piles.get(pileID);
    if (!pile) {
      return of(undefined);
    }

    return of(pile.invoices.find(invoice => invoice.number === invoiceNumber));
  }


  private verifyInvoice(invoice: Invoice): boolean {
    let result = true;
    this.masterRecord.verifyExistance(invoice.sender).subscribe(res => result = result && res);
    this.masterRecord.verifyExistance(invoice.recipient).subscribe(res => result = result && res);
    result = result && !this.isInvoiceNumberUsed(invoice.number);
    result = result && invoice.dateOfService !== '';
    result = result && this.verifyInvoicePositions(invoice.positions);
    result = result && invoice.addition !== '';
    return result;
  }

  private verifyInvoicePositions(positions: InvoicePosition[]): boolean {
    if (positions.length === 0) {
      return false;
    }
    let result = true;
    positions.forEach((position: InvoicePosition) => {
      result = result && position.name !== '' && position.currency !== '';
    });
    return result;
  }
}
