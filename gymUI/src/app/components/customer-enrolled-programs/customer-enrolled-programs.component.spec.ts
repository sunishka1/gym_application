import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEnrolledProgramsComponent } from './customer-enrolled-programs.component';

describe('CustomerEnrolledProgramsComponent', () => {
  let component: CustomerEnrolledProgramsComponent;
  let fixture: ComponentFixture<CustomerEnrolledProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEnrolledProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEnrolledProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
