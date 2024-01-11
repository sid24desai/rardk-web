import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodreadsItem } from 'src/app/models/goodreads-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoodreadsService {
  constructor(private http: HttpClient) {}

  getGoodreadsFinishedBooksFeed(limit: number): Observable<GoodreadsItem[]> {
    return this.http.get<GoodreadsItem[]>(
      `${environment.apiUrl}now/goodreads/finished?limit=${limit}`
    );
  }

  getGoodreadsCurrentlyReadingBooksFeed(
    limit: number
  ): Observable<GoodreadsItem[]> {
    return this.http.get<GoodreadsItem[]>(
      `${environment.apiUrl}now/goodreads/currently-reading?limit=${limit}`
    );
  }
}
