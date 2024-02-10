import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LastfmAlbum } from '../../../models/lastfm/lastfm-album';
import { LastfmArtist } from '../../../models/lastfm/lastfm-artist';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  constructor(private http: HttpClient) {}

  getTopAlbums(limit: number, period: string): Observable<LastfmAlbum[]> {
    return this.http.get<LastfmAlbum[]>(
      `${environment.apiUrl}now/lastfm/topalbums?limit=${limit}&period=${period}`
    );
  }

  getTopArtists(limit: number, period: string): Observable<LastfmArtist[]> {
    return this.http.get<LastfmArtist[]>(
      `${environment.apiUrl}now/lastfm/topartists?limit=${limit}&period=${period}`
    );
  }
}
