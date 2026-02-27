import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../models/evento';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/eventos';

  public tempEvento: Evento = { nombre: '', descripcion: '', imageUrl: '', fecha: '', precio: 0 };
  public esEdicion: boolean = false;

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API_URL);
  }

  postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.API_URL, evento);
  }

  putEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.API_URL}/${id}`, evento);
  }

  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}