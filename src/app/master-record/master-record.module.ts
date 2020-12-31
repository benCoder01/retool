import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterRecordListComponent} from './master-record-list/master-record-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CreateMasterRecordDialogComponent} from './create-master-record-dialog/create-master-record-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatSortModule} from '@angular/material/sort';
import { DeleteMasterRecordDialogComponent } from './delete-master-record-dialog/delete-master-record-dialog.component';
import { EditMasterRecordDialogComponent } from './edit-master-record-dialog/edit-master-record-dialog.component';

@NgModule({
  declarations: [MasterRecordListComponent, CreateMasterRecordDialogComponent, DeleteMasterRecordDialogComponent, EditMasterRecordDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
  ],
  entryComponents: [
    CreateMasterRecordDialogComponent,
    DeleteMasterRecordDialogComponent
  ]
})
export class MasterRecordModule {
}
