import { GithubEventPayloadCommitAuthor } from "./github-event-payload-commit-author";

export class GithubEventPayloadCommit {
    sha: string;
    author: GithubEventPayloadCommitAuthor;
    message: string;
    distinct: boolean;
    url: string
}
