import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Usuario } from '../models/usuarios';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private API_URL = 'http://localhost:8080/login';

  sesionIniciada = signal<boolean>(false);
  rolActual = signal<string | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.sesionIniciada.set(localStorage.getItem('sesion') === 'true');
      this.rolActual.set(localStorage.getItem('rol'));
    }
  }

  login(email: string, password: string) {
    return this.http.post<Usuario>(this.API_URL, { email, password }).pipe(
      tap(u => {
        if (u) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('sesion', 'true');
            localStorage.setItem('rol', u.rol);
          }
          this.rolActual.set(u.rol);
          this.sesionIniciada.set(true);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
    this.router.navigate(['/login']);
  }
}