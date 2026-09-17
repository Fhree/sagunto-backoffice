import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '../../core/services/order.service';
import { OrderKpis, CustomerConsumptionSummary, GroupedOrder } from '../../core/models/order.model';
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
    SharedModule,
    DatePipe
  ],
  templateUrl: './general-order.html',
  styleUrl: './general-order.css'
})
export class GeneralOrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  isModalOpen = signal<boolean>(false);
  selectedUserName = signal<string>('');
  loadingDetails = signal<boolean>(false);
  userOrders = signal<GroupedOrder[]>([]);

  loading = signal<boolean>(false);
  exportingCsv = signal<boolean>(false);
  kpis = signal<OrderKpis>({
    totalPendingDebt: 0, totalImmediatePayments: 0, totalGuests: 0, totalAbsolute: 0,
    pendingDebtCount: 0, immediatePaymentsCount: 0, guestsCount: 0, totalOrdersCount: 0
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

  openUserDetail(user: CustomerConsumptionSummary): void {
    this.selectedUserName.set(user.customerId < 0 ? `${user.name} (Anónimo)` : `${user.name} ${user.surname}`);
    this.isModalOpen.set(true);
    this.loadingDetails.set(true);

    this.orderService.getUserPendingOrders(user.customerId).subscribe({
      next: (flatData) => {
        // Agrupación del JSON plano por orderId
        const grouped = flatData.reduce((acc, curr) => {
          if (!acc[curr.orderId]) {
            acc[curr.orderId] = {
              orderId: curr.orderId,
              orderTotal: curr.orderTotal,
              items: [],
              date: curr.date
            };
          }
          acc[curr.orderId].items.push(curr);
          return acc;
        }, {} as Record<string, GroupedOrder>);

        this.userOrders.set(Object.values(grouped));
        this.loadingDetails.set(false);
      },
      error: (err) => {
        console.error('Error cargando detalles del usuario:', err);
        this.loadingDetails.set(false);
      }
    });
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.userOrders.set([]);
  }
}