import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegoSet } from '../models/lego-set';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LegoSetsService {
  private setsUrl: string =
    `${environment.jsonFileUrl}lego-sets.json`;

  constructor(private http: HttpClient) {}

  public getLegoSets(): Observable<LegoSet[]> {
    return this.http.get<LegoSet[]>(this.setsUrl);
  }
}
