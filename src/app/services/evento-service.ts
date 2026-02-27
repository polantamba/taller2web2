import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../models/evento';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/eventos'; 

  public esEdicion = false;
  public tempEvento: Evento = { nombre: '', descripcion: '', imageUrl: '', fecha: '', precio: 0 };

  getEventos() { 
    return this.http.get<Evento[]>(this.API_URL); 
  }

  postEvento(evento: Evento) { 
    return this.http.post<Evento>(this.API_URL, evento); 
  }

  putEvento(id: number, evento: Evento) { 
    return this.http.put<Evento>(`${this.API_URL}/${id}`, evento); 
  }

  deleteEvento(id: number) { 
    return this.http.delete(`${this.API_URL}/${id}`); 
  }
}