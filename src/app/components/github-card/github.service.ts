import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubEvent } from 'src/app/models/github/github-event';
import { GithubRepository } from 'src/app/models/github/github-repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  async getGithubRepositoryItems() {
    return this.http.get<GithubRepository[]>(
      `${environment.githubUrl}users/${environment.githubUsername}/repos`
    );
  }

  async getGithubEvents() {
    return this.http.get<GithubEvent[]>(
      `${environment.githubUrl}users/${environment.githubUsername}/events`
    );
  }
}
