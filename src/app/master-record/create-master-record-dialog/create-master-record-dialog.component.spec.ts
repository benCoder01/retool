import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterRecordDialogComponent } from './create-master-record-dialog.component';

describe('CreateMasterRecordDialogComponent', () => {
  let component: CreateMasterRecordDialogComponent;
  let fixture: ComponentFixture<CreateMasterRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMasterRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMasterRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
