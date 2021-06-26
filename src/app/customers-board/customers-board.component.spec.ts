import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersBoardComponent } from './customers-board.component';

describe('CustomersBoardComponent', () => {
  let component: CustomersBoardComponent;
  let fixture: ComponentFixture<CustomersBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
