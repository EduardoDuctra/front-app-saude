import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMCDTO } from '../../DTO/IMCDTO';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';

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

  salvarUsuario(usuario: any): Observable<DadoUsuarioDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DadoUsuarioDTO>(`${this.baseUrl}/salvar`, usuario, {
      headers,
    });
  }

  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<DadoUsuarioDTO>(`${this.baseUrl}/perfil`, { headers });
  }

  atualizarUsuario(usuario: DadoUsuarioDTO): Observable<DadoUsuarioDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<DadoUsuarioDTO>(`${this.baseUrl}/atualizar`, usuario, {
      headers,
    });
  }
}
