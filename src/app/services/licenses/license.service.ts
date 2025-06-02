import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageModel } from '../../models/page-model';
import { License } from '../../models/license';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  
  private apiUrl: string = "http://localhost:8080/api/licenses";

  constructor(private httpClient: HttpClient) { }

  findAll(page: number, size: number): Observable<PageModel<License>> {
    return this.httpClient.get<PageModel<License>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchLicenses(licenseName: string, entityJurisdiction: string[], licenseJurisdictionName: string, page: number, size: number): Observable<PageModel<License>> {
    let requestBody = {
      "licenseName": licenseName,
      "entityJurisdiction": entityJurisdiction,
      "licenseJurisdictionName": licenseJurisdictionName
    }
    return this.httpClient.post<PageModel<License>>(`${this.apiUrl}/search?page=${page}&size=${size}`, requestBody);
  }

  findByIdIn(ids: number[]): Observable<License[]> {
    return this.httpClient.post<License[]>(`${this.apiUrl}/byIdIn`, ids);
  }

}
