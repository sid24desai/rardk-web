import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegoSet } from '../models/lego-set';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LegoSetsService {
  private setsUrl: string =
    'https://raw.githubusercontent.com/rarDevelopment/rardk-web-json-files/main/lego-sets.json';

  constructor(private http: HttpClient) {}

  public getLegoSets(): Observable<LegoSet[]> {
    return this.http.get<LegoSet[]>(this.setsUrl);
  }
}
