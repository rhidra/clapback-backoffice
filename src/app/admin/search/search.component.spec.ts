import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: AdminSearchComponent;
  let fixture: ComponentFixture<AdminSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
