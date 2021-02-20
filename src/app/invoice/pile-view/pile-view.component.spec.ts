import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PileViewComponent } from './pile-view.component';

describe('PileViewComponent', () => {
  let component: PileViewComponent;
  let fixture: ComponentFixture<PileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
