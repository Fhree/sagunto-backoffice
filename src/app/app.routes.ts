import { Routes } from '@angular/router';
import { GeneralOrdersComponent } from './features/general-orders/general-orders';
import { BartenderPerformanceComponent } from './features/bartender-performance/bartender-performance';

export const routes: Routes = [
  {
    path: '',
    component: GeneralOrdersComponent,
    title: 'Sagunto | Consumo General'
  },
  {
    path: 'performance-bartenders',
    component: BartenderPerformanceComponent,
    title: 'Sagunto | Rendimiento Camareros'
  },
  {
    path: '**',
    redirectTo: ''
  }
];