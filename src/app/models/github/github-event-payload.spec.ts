import { GithubEventPayload } from './github-event-payload';

describe('GithubEventPayload', () => {
  it('should create an instance', () => {
    expect(new GithubEventPayload()).toBeTruthy();
  });
});
