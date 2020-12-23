import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRecordListComponent } from './master-record-list.component';

describe('MasterRecordListComponent', () => {
  let component: MasterRecordListComponent;
  let fixture: ComponentFixture<MasterRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRecordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
