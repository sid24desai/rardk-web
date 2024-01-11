import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackloggdItem } from 'src/app/models/backloggd-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackloggdService {
  constructor(private http: HttpClient) {}

  getBackloggdFeed(limit: number): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${environment.apiUrl}now/backloggd/reviews?limit=${limit}`);
  }

  getBackloggdCurrentGames(limit: number): Observable<BackloggdItem[]> {
    return this.http.get<BackloggdItem[]>(`${environment.apiUrl}now/backloggd/current?limit=${limit}`);
  }
}
