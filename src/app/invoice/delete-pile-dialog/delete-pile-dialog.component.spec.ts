import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePileDialogComponent } from './delete-pile-dialog.component';

describe('DeletePileDialogComponent', () => {
  let component: DeletePileDialogComponent;
  let fixture: ComponentFixture<DeletePileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
