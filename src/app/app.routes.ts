import { Routes } from '@angular/router';
import { GeneralOrdersComponent } from './features/general-orders/general-orders';

export const routes: Routes = [
  {
    path: '',
    component: GeneralOrdersComponent,
    title: 'Sagunto | Consumo General'
  },
  {
    path: '**',
    redirectTo: ''
  }
];