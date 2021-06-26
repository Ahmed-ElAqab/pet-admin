import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditDetailsComponent } from './service-edit-details.component';

describe('ServiceEditDetailsComponent', () => {
  let component: ServiceEditDetailsComponent;
  let fixture: ComponentFixture<ServiceEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEditDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
