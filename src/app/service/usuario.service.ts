import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMCDTO } from '../../DTO/IMCDTO';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  // -------------------------------------------
  // ✔ Calcular IMC
  // -------------------------------------------
  calcularIMC(): Observable<IMCDTO> {
    return this.http.get<IMCDTO>(`${this.baseUrl}/imc`);
  }

  // -------------------------------------------
  // ✔ Salvar usuário (público)
  // -------------------------------------------
  salvarUsuario(usuario: any): Observable<DadoUsuarioDTO> {
    return this.http.post<DadoUsuarioDTO>(`${this.baseUrl}/salvar`, usuario);
  }

  // -------------------------------------------
  // ✔ Carregar perfil do usuário logado
  // -------------------------------------------
  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    return this.http.get<DadoUsuarioDTO>(`${this.baseUrl}/perfil`);
  }

  // -------------------------------------------
  // ✔ Atualizar usuário
  // -------------------------------------------
  atualizarUsuario(usuario: DadoUsuarioDTO): Observable<DadoUsuarioDTO> {
    return this.http.put<DadoUsuarioDTO>(`${this.baseUrl}/atualizar`, usuario);
  }

  // -------------------------------------------
  // ✔ Listar usuários (ADMIN)
  // -------------------------------------------
  listarUsuarios(): Observable<DadoUsuarioDTO[]> {
    return this.http.get<DadoUsuarioDTO[]>(`${this.baseUrl}/listar-usuarios`);
  }
}
