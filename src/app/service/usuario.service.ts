import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMCDTO } from '../../DTO/IMCDTO';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/sistema-saude/usuario';

  constructor(private http: HttpClient) {}

  calcularIMC(): Observable<IMCDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<IMCDTO>(`${this.baseUrl}/imc`, { headers });
  }
}
