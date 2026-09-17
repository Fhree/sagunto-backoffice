import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { BartenderPerformanceDto } from '../../core/models/bartender.model';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'sgbo-bartender-performance',
  standalone: true,
  imports: [CurrencyPipe, ChartModule, UpperCasePipe],
  templateUrl: './bartender-performance.html',
  styleUrl: './bartender-performance.css'
})
export class BartenderPerformanceComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  loading = signal<boolean>(true);
  bartenders = signal<BartenderPerformanceDto[]>([]);
  
  // Signals para la configuración de Chart.js
  chartData = signal<any>({});
  chartOptions = signal<any>({});

  ngOnInit(): void {
    this.initChartOptions();
    this.loadData();
  }

  loadData(): void {
    this.orderService.getBartenderPerformance().subscribe({
      next: (data) => {
        this.bartenders.set(data);
        this.processChartData(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando rendimiento:', err);
        this.loading.set(false);
      }
    });
  }

  processChartData(data: BartenderPerformanceDto[]): void {
    // 1. Extraemos todas las fechas únicas y las ordenamos
    const allDates = new Set<string>();
    data.forEach(b => b.dailyStats.forEach(d => allDates.add(d.date)));
    const sortedDates = Array.from(allDates).sort();

    // Paleta de colores para los 4 camareros
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    // 2. Mapeamos los datos respetando los días sin ventas (ceros)
    const datasets = data.map((bartender, index) => {
      const dataPoints = sortedDates.map(date => {
        const stat = bartender.dailyStats.find(d => d.date === date);
        return stat ? stat.consumptions : 0;
      });

      return {
        label: bartender.name,
        data: dataPoints,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        tension: 0.4, // Curvatura suave de la línea
        fill: false
      };
    });

    this.chartData.set({
      labels: sortedDates,
      datasets: datasets
    });
  }

  initChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#334155';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#e2e8f0';

    this.chartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor, font: { weight: '600' } }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          ticks: { color: textColor, stepSize: 1 },
          grid: { color: surfaceBorder, drawBorder: false },
          beginAtZero: true
        }
      }
    });
  }
}