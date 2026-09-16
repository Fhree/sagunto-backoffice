import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'sgbo-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Consumo General', icon: 'pi pi-chart-bar', route: '/' },
    { label: 'Detalle de Morosos', icon: 'pi pi-users', route: '/morosos' },
    { label: 'Histórico de Pedidos', icon: 'pi pi-receipt', route: '/pedidos' }
  ];
}