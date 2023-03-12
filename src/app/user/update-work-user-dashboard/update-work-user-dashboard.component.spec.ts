import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UpdateWorkUserDashboardComponent } from './update-work-schedule-user-dashboard.component';

import {UpdateWorkUserDashboardComponent} from './update-work-user-dashboard.component'

describe('UpdateWorkUserDashboardComponent', () => {
  let component: UpdateWorkUserDashboardComponent;
  let fixture: ComponentFixture<UpdateWorkUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWorkUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
