import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento-service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-listado-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-eventos.html'
})
export class ListadoEventos {
  public servicio = inject(EventoService);

  @Input() eventos: Evento[] = [];
  @Output() eventoEliminado = new EventEmitter<void>();

  prepararEdicion(item: Evento) {
    this.servicio.tempEvento = { ...item };
    this.servicio.esEdicion = true;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este evento?')) {
      this.servicio.deleteEvento(id).subscribe(() => {
        this.eventoEliminado.emit();
      });
    }
  }
}