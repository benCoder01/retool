import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MasterDataService} from '../../master-data.service';
import {Company} from '../../types';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CreateMasterRecordDialogComponent} from '../create-master-record-dialog/create-master-record-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DeleteMasterRecordDialogComponent} from '../delete-master-record-dialog/delete-master-record-dialog.component';
import {EditMasterRecordDialogComponent} from '../edit-master-record-dialog/edit-master-record-dialog.component';

@Component({
  selector: 'app-master-record-list',
  templateUrl: './master-record-list.component.html',
  styleUrls: ['./master-record-list.component.css']
})
export class MasterRecordListComponent implements OnInit, AfterViewInit {

  createDialogConfig: MatDialogConfig = {
    height: '600px',
    width: '600px',
  };
  displayedColumns: string[] = ['debitorID', 'creditorID', 'name', 'iban', 'eMail', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Company>([]);

  company: Company = {
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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private masterRecordService: MasterDataService, private snackBar: MatSnackBar) {
  }

  openCreateDialog(): void {
    this.dialog.open(CreateMasterRecordDialogComponent, this.createDialogConfig).afterClosed().subscribe(result => {
      if (result === -1) {
        this.snackBar.open('Could not create entry', '', {
          duration: 2000
        });
      } else {
        this.refresh();
      }
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.masterRecordService.getMasterRecords().subscribe((records: Company[]) => {
      this.dataSource.data = records;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCompany(company: Company): void {
    this.dialog.open(EditMasterRecordDialogComponent, {
      height: '600px',
      width: '600px',
      data: {c: company}
    }).afterClosed().subscribe((result) => {
      if (result === -1) {
        this.snackBar.open('Could not edit entry', '', {
          duration: 2000
        });
      } else {
        this.refresh();
      }
    });
  }

  deleteCompany(company: Company): void {
    this.dialog.open(DeleteMasterRecordDialogComponent, {
      data: {
        c: company
      }
    }).afterClosed().subscribe((result) => {
      if (result === -1) {
        this.snackBar.open('Could not delete entry', '', {
          duration: 2000
        });
      } else {
        this.refresh();
      }
    });
  }
}
