import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {InvoiceService} from '../../invoice.service';
import {Company, Invoice, Pile} from '../../types';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {invoice1, invoice2} from '../../dummyData';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, AfterViewInit {

  id: string;

  displayedColumns: string[] = ['number', 'recipientName', 'date', 'dateOfService', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Invoice>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.id = params['id'];
    });
    this.invoiceService.createInvoice(this.id, invoice1);
    this.invoiceService.createInvoice(this.id, invoice2);
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (invoice: Invoice, property: string) => {
      switch (property) {
        case 'recipientName': return invoice.recipient.name;
        default: return invoice[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.invoiceService.openPile(this.id).subscribe((result: Pile) => {
      this.dataSource.data = result.invoices;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  openCreateDialog(): void {

  }

  openEditDialog(invoice: Invoice): void {

  }

  openDeleteDialog(invoice: Invoice): void {
  }


  // Thanks to Stackoverflow
  nestedFilterCheck(search, data, key): any {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

}
