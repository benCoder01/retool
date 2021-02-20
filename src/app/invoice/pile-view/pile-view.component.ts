import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../invoice.service';
import {Pile} from '../../types';
import {MatDialog} from '@angular/material/dialog';
import {CreatePileDialogComponent} from '../create-pile-dialog/create-pile-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeletePileDialogComponent} from '../delete-pile-dialog/delete-pile-dialog.component';

@Component({
  selector: 'app-pile-view',
  templateUrl: './pile-view.component.html',
  styleUrls: ['./pile-view.component.css']
})
export class PileViewComponent implements OnInit {
  piles: Map<string, Pile>;

  constructor(private invoiceService: InvoiceService, private dialogService: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.invoiceService.getPiles().subscribe((res: Map<string, Pile>) => {
      this.piles = res;
    });
  }

  openCreateDialog(): void {
    this.dialogService.open(CreatePileDialogComponent, {
      height: '250px',
      width: '600px',
    }).afterClosed().subscribe((result: string) => {
      if (result === '') {
        this.snackBar.open('Could not create entry', '', {
          duration: 2000
        });
      } else if (result) {
        this.invoiceService.createPile(result).subscribe((res: string) => {
          if (res === '') {
            this.snackBar.open('Could not create entry', '', {
              duration: 2000
            });
          } else {
            this.invoiceService.getPiles().subscribe((res1: Map<string, Pile>) => {
              this.piles = res1;
            });
          }
        });
      }
    });
  }

  openDeleteDialog(id: string, name: string): void {
    this.dialogService.open(DeletePileDialogComponent, {
      data: {
        name
      }
    }).afterClosed().subscribe((result) => {
      if (result === 1) {
        this.invoiceService.deletePile(id).subscribe((res: string) => {
          if (res === '') {
            this.snackBar.open('Could not delete entry', '', {
              duration: 2000
            });
          } else {
            this.invoiceService.getPiles().subscribe((res1: Map<string, Pile>) => {
              this.piles = res1;
            });
          }
        });
      }
    });
  }

}
