import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsBoardComponent } from './admins-board.component';

describe('AdminsBoardComponent', () => {
  let component: AdminsBoardComponent;
  let fixture: ComponentFixture<AdminsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
