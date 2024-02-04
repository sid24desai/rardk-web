import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../models/link';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private linksUrl: string =
    'https://raw.githubusercontent.com/rarDevelopment/links/main/links.json';

  constructor(private http: HttpClient) {}

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.linksUrl);
  }
}
