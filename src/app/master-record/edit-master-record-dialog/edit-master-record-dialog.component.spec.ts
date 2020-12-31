import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterRecordDialogComponent } from './edit-master-record-dialog.component';

describe('EditMasterRecordDialogComponent', () => {
  let component: EditMasterRecordDialogComponent;
  let fixture: ComponentFixture<EditMasterRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMasterRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
