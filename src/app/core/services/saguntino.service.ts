import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Saguntino } from '../models/saguntino.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaguntinoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getSaguntinos(): Observable<Saguntino[]> {
    return this.http.get<Saguntino[]>(`${this.apiUrl}/reports/saguntinos`);
  }
}