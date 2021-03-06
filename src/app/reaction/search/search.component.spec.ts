import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionSearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: ReactionSearchComponent;
  let fixture: ComponentFixture<ReactionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
