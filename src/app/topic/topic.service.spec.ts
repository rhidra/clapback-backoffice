import { TestBed } from '@angular/core/testing';

import { TopicService } from './group.service';

describe('GroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicService = TestBed.get(TopicService);
    expect(service).toBeTruthy();
  });
});
