import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '../../core/services/order.service';
import { OrderKpis, CustomerConsumptionSummary } from '../../core/models/order.model';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'sgbo-general-orders',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SharedModule
  ],
  templateUrl: './general-order.html',
  styleUrl: './general-order.css'
})
export class GeneralOrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  loading = signal<boolean>(false);
  exportingCsv = signal<boolean>(false);
  kpis = signal<OrderKpis>({
    totalPendingDebt: 0, totalImmediatePayments: 0, totalGuests: 0,
    pendingDebtCount: 0, immediatePaymentsCount: 0, guestsCount: 0
  });
  
  // Usamos el nuevo modelo
  consumptions = signal<CustomerConsumptionSummary[]>([]);
  globalFilterValue = signal<string>('');

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);
    
    this.orderService.getKpis().subscribe({
      next: (data) => this.kpis.set(data),
      error: (err) => console.error('Error cargando KPIs:', err)
    });

    // Llamada al endpoint de consumo general
    this.orderService.getGeneralConsumption().subscribe({
      next: (data) => {
        this.consumptions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando consumos:', err);
        this.loading.set(false);
      }
    });
  }

  downloadCsv(): void {
    this.exportingCsv.set(true);
    this.orderService.exportGeneralConsumptionCsv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consumo_general_sagunto_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.exportingCsv.set(false);
      },
      error: (err) => {
        console.error('Error descargando CSV:', err);
        this.exportingCsv.set(false);
      }
    });
  }
}