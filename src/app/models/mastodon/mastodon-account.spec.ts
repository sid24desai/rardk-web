import { MastodonAccount } from './mastodon-account';

describe('MastodonAccount', () => {
  it('should create an instance', () => {
    expect(new MastodonAccount()).toBeTruthy();
  });
});
