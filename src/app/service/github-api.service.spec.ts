/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GithubApiService } from './github-api.service';

describe('Service: GithubApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubApiService]
    });
  });

  it('should ...', inject([GithubApiService], (service: GithubApiService) => {
    expect(service).toBeTruthy();
  }));
});
