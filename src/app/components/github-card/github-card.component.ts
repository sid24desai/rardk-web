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

  public githubRepoEvents: Map<string, GithubEvent[]>;
  // private numberOfRepositoriesToTake = 5;
  private numberOfCommitsToTake = 30;

  ngOnInit() {
    // this.populateGithubRepositoryItems();
    this.populateGithubEvents();
    console.log(this.githubRepoEvents);
  }

  public async populateGithubEvents() {
    (await this.githubService.getGithubEvents()).subscribe(
      (events: GithubEvent[]) => {
        var pushEvents = events
          .filter((g) => {
            if (!g.payload.commits || g.payload.commits.length !== 1) {
              return false;
            }
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
          .sort((g1, g2) => (g2.created_at > g1.created_at ? 1 : -1));

        let groupedEvents = this.groupEventsByRepo(pushEvents);
        groupedEvents.forEach(
          (e) =>
            (e = e.sort((e1, e2) => {
              return e2.created_at > e1.created_at ? 1 : -1;
            }))
        );
        this.githubRepoEvents = groupedEvents;
      }
    );
  }

  private groupEventsByRepo(events: GithubEvent[]): Map<string, GithubEvent[]> {
    let repositoriesWithEvents: Map<string, GithubEvent[]> = new Map<
      string,
      GithubEvent[]
    >();
    events.forEach((event) => {
      if (!repositoriesWithEvents.has(event.repo.name)) {
        repositoriesWithEvents.set(event.repo.name, []);
      }
      let eventsForRepo = repositoriesWithEvents.get(event.repo.name);
      eventsForRepo?.push(event);
      repositoriesWithEvents.set(event.repo.name, eventsForRepo!);
    });
    return repositoriesWithEvents;
  }
}
