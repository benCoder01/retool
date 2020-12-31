import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMasterRecordDialogComponent } from './delete-master-record-dialog.component';

describe('DeleteMasterRecordDialogComponent', () => {
  let component: DeleteMasterRecordDialogComponent;
  let fixture: ComponentFixture<DeleteMasterRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMasterRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMasterRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
