import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../models/link';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private linksUrl: string =
    `${environment.jsonFileUrl}links.json`;

  constructor(private http: HttpClient) {}

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.linksUrl);
  }
}
