import { Component, OnInit } from '@angular/core';
import { GithubEvent } from 'src/app/models/github/github-event';
import { GithubRepository } from 'src/app/models/github/github-repository';
import { environment } from 'src/environments/environment';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.scss'],
})
export class GithubCardComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  public githubRepositoryItems: GithubRepository[];
  public githubEvents: GithubEvent[];
  private numberOfRepositoriesToTake = 5;
  private numberOfCommitsToTake = 10;

  ngOnInit() {
    this.populateGithubRepositoryItems();
    // this.populateGithubEvents();
  }

  public async populateGithubRepositoryItems() {
    (await this.githubService.getGithubRepositoryItems()).subscribe(
      (repos: GithubRepository[]) => {
        return (this.githubRepositoryItems = repos
          .filter((g) => !g.archived)
          .sort((g1, g2) => (g2.updated_at > g1.updated_at ? 1 : -1)));
        //.slice(0, this.numberOfRepositoriesToTake));
      }
    );
  }

  public async populateGithubEvents() {
    (await this.githubService.getGithubEvents()).subscribe(
      (events: GithubEvent[]) => {
        return (this.githubEvents = events
          .filter((g) => {
            if (!g.payload.commits || g.payload.commits.length === 0) {
              return false;
            }
            console.log(g.payload.commits);
            if (!g.payload.commits[0].url || g.payload.commits[0].url == '') {
              return false;
            }
            if (g.type != 'PushEvent') {
              return false;
            }
            return g.actor.login == environment.githubUsername;
          })
          .map((g) => {
            g.payload.commits = g.payload.commits.filter(
              (c) => c.author.email == environment.githubActorName
            );
            return g;
          })
          .sort((g1, g2) => (g2.created_at > g1.created_at ? 1 : -1)));
        //.slice(0, this.numberOfCommitsToTake));
      }
    );
  }
}
