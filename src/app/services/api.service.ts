import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public domainUrl: string;
  constructor(public http: HttpClient) {
    this.domainUrl = window.location.host;
  }
}
