import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderKpis, CustomerConsumptionSummary, OrderDetailDto } from '../models/order.model';
import { BartenderPerformanceDto } from '../models/bartender.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  // Puerto corregido al 7010
  private readonly apiUrl = 'http://localhost:7010/api/reports';

  getKpis(): Observable<OrderKpis> {
    return this.http.get<OrderKpis>(`${this.apiUrl}/kpis`);
  }

  // Apuntamos al endpoint correcto y devolvemos la nueva interfaz
  getGeneralConsumption(): Observable<CustomerConsumptionSummary[]> {
    return this.http.get<CustomerConsumptionSummary[]>(`${this.apiUrl}/general-consumption`);
  }

  exportGeneralConsumptionCsv(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/general-consumption/export-csv`, {
      responseType: 'blob'
    });
  }

  getUserPendingOrders(customerId: number): Observable<OrderDetailDto[]> {
    return this.http.get<OrderDetailDto[]>(`${this.apiUrl}/customers/${customerId}/detail`);
  }

  getBartenderPerformance(): Observable<BartenderPerformanceDto[]> {
  return this.http.get<BartenderPerformanceDto[]>(`${this.apiUrl}/bartenders`);
}
}