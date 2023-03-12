import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCategoryAdminComponent } from './load-category-admin.component';

describe('LoadCategoryAdminComponent', () => {
  let component: LoadCategoryAdminComponent;
  let fixture: ComponentFixture<LoadCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCategoryAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
