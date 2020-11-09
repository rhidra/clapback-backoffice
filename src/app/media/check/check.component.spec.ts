import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCheckComponent } from './check.component';

describe('CheckComponent', () => {
  let component: MediaCheckComponent;
  let fixture: ComponentFixture<MediaCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
