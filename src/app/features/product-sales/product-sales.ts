import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProductService } from '../../core/services/product.service';
import { ProductSales } from '../../core/models/product.model';

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, SelectButtonModule],
  templateUrl: './product-sales.html',
  styleUrls: ['./product-sales.css']
})
export class ProductSalesComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<ProductSales[]>([]);
  loading = signal<boolean>(true);
  festiveDays = signal<string[]>([]);

  viewOptions = [
    { label: 'Saguntinos', value: 'saguntinos' },
    { label: 'Invitados / Barra', value: 'guests' },
    { label: 'Vista Combinada', value: 'combined' }
  ];
  selectedView = signal<string>('saguntinos');

  ngOnInit() {
    this.loadProductSales();
  }

  loadProductSales() {
    this.loading.set(true);
    this.productService.getProductSales().subscribe({
      next: (data) => {
        this.products.set(data);
        if (data.length > 0) {
          this.festiveDays.set(data[0].dailySales.map(d => d.festiveBlock));
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar la matriz de ventas', err);
        this.loading.set(false);
      }
    });
  }
}