import { GithubEventPayloadCommit } from './github-event-payload-commit';

export class GithubEventPayload {
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string;
  head: string;
  before: string;
  commits: GithubEventPayloadCommit[];
}
