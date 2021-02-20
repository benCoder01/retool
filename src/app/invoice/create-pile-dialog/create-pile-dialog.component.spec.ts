import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePileDialogComponent } from './create-pile-dialog.component';

describe('CreatePileDialogComponent', () => {
  let component: CreatePileDialogComponent;
  let fixture: ComponentFixture<CreatePileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
