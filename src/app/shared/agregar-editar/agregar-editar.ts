import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento-service';

@Component({
  selector: 'app-agregar-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-editar.html'
})
export class AgregarEditar {
  public servicio = inject(EventoService);

  guardar() {
    const datos = this.servicio.tempEvento;
    if (this.servicio.esEdicion && datos.id) {
      this.servicio.putEvento(datos.id, datos).subscribe(() => this.limpiar());
    } else {
      this.servicio.postEvento(datos).subscribe(() => this.limpiar());
    }
  }

  limpiar() {
    this.servicio.tempEvento = { nombre: '', descripcion: '', imageUrl: '', fecha: '', precio: 0 };
    this.servicio.esEdicion = false;
  }
}