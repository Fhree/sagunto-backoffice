import { Routes } from '@angular/router';
import { GeneralOrdersComponent } from './features/general-orders/general-orders';
import { BartenderPerformanceComponent } from './features/bartender-performance/bartender-performance';
import { SaguntinosListComponent } from './features/saguntinos/saguntinos-list';

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
    path: 'saguntinos',
    component: SaguntinosListComponent,
    title: 'Sagunto | Saguntinos'
  },
  {
    path: '**',
    redirectTo: ''
  }
];