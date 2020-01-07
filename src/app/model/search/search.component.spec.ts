import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSearchComponent } from './search.component';

describe('ModelSearchComponent', () => {
  let component: ModelSearchComponent;
  let fixture: ComponentFixture<ModelSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
