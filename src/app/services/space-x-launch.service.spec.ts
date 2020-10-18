import { TestBed } from '@angular/core/testing';

import { SpaceXLaunchService } from './space-x-launch.service';

describe('SpaceXLaunchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceXLaunchService = TestBed.get(SpaceXLaunchService);
    expect(service).toBeTruthy();
  });
});
