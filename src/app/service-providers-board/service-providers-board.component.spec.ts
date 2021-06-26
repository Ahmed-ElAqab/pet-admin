import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvidersBoardComponent } from './service-providers-board.component';

describe('ServiceProvidersBoardComponent', () => {
  let component: ServiceProvidersBoardComponent;
  let fixture: ComponentFixture<ServiceProvidersBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProvidersBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProvidersBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
