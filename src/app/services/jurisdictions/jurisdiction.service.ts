import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jurisdiction } from '../../models/jurisdiction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JurisdictionService {

  private apiUrl: string = "http://localhost:8080/api/jurisdictions";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Jurisdiction[]> {
    return this.httpClient.get<Jurisdiction[]>(`${this.apiUrl}`);
  }

}
