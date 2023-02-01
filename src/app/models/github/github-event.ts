import { GithubEventActor } from './github-event-actor';
import { GithubEventPayload } from './github-event-payload';
import { GithubEventRepository } from './github-event-repository';

export class GithubEvent {
  id: string;
  type: string;
  actor: GithubEventActor;
  repo: GithubEventRepository;
  payload: GithubEventPayload;
  public: boolean;
  created_at: string;
}
