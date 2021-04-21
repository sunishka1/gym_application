import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkteamDashboardComponent } from './markteam-dashboard.component';

describe('MarkteamDashboardComponent', () => {
  let component: MarkteamDashboardComponent;
  let fixture: ComponentFixture<MarkteamDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkteamDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkteamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
