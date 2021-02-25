import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PileViewComponent} from './pile-view/pile-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CreatePileDialogComponent} from './create-pile-dialog/create-pile-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {DeletePileDialogComponent} from './delete-pile-dialog/delete-pile-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CreateInvoiceDialogComponent} from './create-invoice-dialog/create-invoice-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';

@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
  ],
  declarations: [PileViewComponent, InvoiceListComponent, CreatePileDialogComponent, DeletePileDialogComponent, CreateInvoiceDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [CreatePileDialogComponent, DeletePileDialogComponent, CreateInvoiceDialogComponent]
})
export class InvoiceModule {
}
