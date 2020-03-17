import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: ReactionEditComponent;
  let fixture: ComponentFixture<ReactionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
