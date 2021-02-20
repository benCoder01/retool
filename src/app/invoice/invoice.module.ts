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
import { DeletePileDialogComponent } from './delete-pile-dialog/delete-pile-dialog.component';
@NgModule({
  declarations: [PileViewComponent, InvoiceListComponent, CreatePileDialogComponent, DeletePileDialogComponent],
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
    MatMenuModule
  ],
  entryComponents: [CreatePileDialogComponent, DeletePileDialogComponent]
})
export class InvoiceModule {
}
