import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderKpis, CustomerConsumptionSummary, OrderDetailDto } from '../models/order.model';
import { BartenderPerformanceDto } from '../models/bartender.model';
import { environment } from '../../../environments/environment';
import { ProductSales } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProductSales() {
    return this.http.get<ProductSales[]>(`${this.apiUrl}/reports/products/sales`);
  }
}
