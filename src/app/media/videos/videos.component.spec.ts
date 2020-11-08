import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaVideosComponent } from './videos.component';

describe('SearchComponent', () => {
  let component: MediaVideosComponent;
  let fixture: ComponentFixture<MediaVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
