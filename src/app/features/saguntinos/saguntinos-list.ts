import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Saguntino } from '../../core/models/saguntino.model';
import { SaguntinoService } from '../../core/services/saguntino.service';


@Component({
  selector: 'app-saguntinos-list',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule],
  templateUrl: './saguntinos-list.html',
  styleUrls: ['./saguntinos-list.css']
})
export class SaguntinosListComponent implements OnInit {
  private saguntinosService = inject(SaguntinoService);

  // Convertimos el array tradicional en un Signal
  saguntinos = signal<Saguntino[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.cargarCensoInicial();
  }

  cargarCensoInicial() {
    this.loading.set(true);
    this.saguntinosService.getSaguntinos().subscribe({
      next: (data) => {
        // Usamos .set() para notificar a Angular y forzar el repintado
        this.saguntinos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el censo', err);
        this.loading.set(false);
      }
    });
  }
}