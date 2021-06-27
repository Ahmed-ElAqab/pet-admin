import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersBoardComponent } from './sellers-board.component';

describe('SellersBoardComponent', () => {
  let component: SellersBoardComponent;
  let fixture: ComponentFixture<SellersBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
