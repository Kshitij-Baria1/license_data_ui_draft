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

}
