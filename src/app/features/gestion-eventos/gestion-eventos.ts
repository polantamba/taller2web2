import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento-service';
import { Evento } from '../../models/evento';
import { ListadoEventos } from '../../shared/listado-eventos/listado-eventos';
import { AgregarEditar } from '../../shared/agregar-editar/agregar-editar';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [CommonModule, ListadoEventos, AgregarEditar],
  templateUrl: './gestion-eventos.html'
})
export class GestionEventos implements OnInit {
  public servicio = inject(EventoService);
  listaEventos = signal<Evento[]>([]);

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.servicio.getEventos().subscribe(res => {
      this.listaEventos.set(res);
    });
  }

  eliminarEvento(id: number) {
    this.servicio.deleteEvento(id).subscribe(() => {
      this.obtenerEventos();
    });
  }
}