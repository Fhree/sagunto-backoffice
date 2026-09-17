import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SaguntinoService } from '../../core/services/saguntino.service';
import { Saguntino } from '../../core/models/saguntino.model';


@Component({
  selector: 'app-saguntinos-list',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule],
  templateUrl: './saguntinos-list.html',
  styleUrls: ['./saguntinos-list.css']
})
export class SaguntinosListComponent implements OnInit {
  // Usamos Inyección de Dependencias moderna de Angular
  private saguntinoService = inject(SaguntinoService);

  // Tipado estricto con tu nueva interfaz
  saguntinos: Saguntino[] = [];
  
  // Control de estado para mostrar la tabla vacía o un spinner mientras carga
  loading: boolean = true;

  ngOnInit() {
    this.loadSaguntinos();
  }

  loadSaguntinos() {
    this.loading = true;
    
    // Nos suscribimos al observable de tu servicio
    this.saguntinoService.getSaguntinos().subscribe({
      next: (data) => {
        this.saguntinos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el censo de saguntinos', err);
        this.loading = false;
      }
    });
  }
}