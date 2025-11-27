import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DadoUsuarioDTO } from '../models/DTO/DadoUsuarioDTO';
import { IMCDTO } from '../models/DTO/IMCDTO';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  calcularIMC(): Observable<IMCDTO> {
    return this.http.get<IMCDTO>(`${this.baseUrl}/imc`);
  }

  salvarUsuario(usuario: any): Observable<DadoUsuarioDTO> {
    return this.http.post<DadoUsuarioDTO>(`${this.baseUrl}/salvar`, usuario);
  }

  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    return this.http.get<DadoUsuarioDTO>(`${this.baseUrl}/perfil`);
  }

  atualizarUsuario(usuario: DadoUsuarioDTO): Observable<DadoUsuarioDTO> {
    return this.http.put<DadoUsuarioDTO>(`${this.baseUrl}/atualizar`, usuario);
  }

  listarUsuarios(): Observable<DadoUsuarioDTO[]> {
    return this.http.get<DadoUsuarioDTO[]>(`${this.baseUrl}/listar-usuarios`);
  }
}
