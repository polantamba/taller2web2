import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { AuthService } from '../../services/auth-service';
import { Usuario } from '../../models/usuarios';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-registro.html'
})
export class FormularioRegistro implements OnInit {
  public auth = inject(AuthService);
  private usuarioService = inject(UsuarioService);

  listaUsuarios = signal<Usuario[]>([]);
  editando = signal<boolean>(false);
  nuevoUsuario: Usuario = { nombre: '', email: '', phone: '', password: '', rol: 'ROLE_EMPLEADO' };

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => this.listaUsuarios.set(res));
  }

  seleccionarParaEditar(u: Usuario) {
    if (this.auth.rolActual() !== 'ROLE_ADMIN') return;
    this.editando.set(true);
    this.nuevoUsuario = { ...u };
  }

  guardarUsuario() {
    if (this.auth.rolActual() !== 'ROLE_ADMIN') return;
    if (this.editando() && this.nuevoUsuario.id) {
      this.usuarioService.putUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe(() => this.resetForm());
    } else {
      this.usuarioService.postUsuario(this.nuevoUsuario).subscribe(() => this.resetForm());
    }
  }

  eliminarUsuario(id: number) {
    if (this.auth.rolActual() !== 'ROLE_ADMIN') return;
    if (confirm('¿Eliminar usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => this.obtenerUsuarios());
    }
  }

  resetForm() {
    this.editando.set(false);
    this.nuevoUsuario = { nombre: '', email: '', phone: '', password: '', rol: 'ROLE_EMPLEADO' };
    this.obtenerUsuarios();
  }
}