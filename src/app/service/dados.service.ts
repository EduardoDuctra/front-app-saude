import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO para dados do usuário
export interface DadoDTO {
  codDado: number;
  peso: number;
  glicose: number;
  colesterolHDL: number;
  colesterolVLDL: number;
  creatina: number;
  trigliceridio: number;
}

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  private baseUrl = 'http://localhost:8080/sistema-saude/dados';

  constructor(private http: HttpClient) {}

  // Listar todos os dados do usuário logado
  listarDadosUsuario(): Observable<DadoDTO[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<DadoDTO[]>(`${this.baseUrl}/buscar-por-usuario`, {
      headers,
    });
  }

  // Salvar um novo dado
  salvarDado(dado: Partial<DadoDTO>): Observable<DadoDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<DadoDTO>(`${this.baseUrl}/salvar`, dado, { headers });
  }

  // Atualizar dado existente
  atualizarDado(dado: DadoDTO): Observable<DadoDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<DadoDTO>(`${this.baseUrl}/atualizar`, dado, {
      headers,
    });
  }

  // Excluir dado pelo código
  excluirDado(codDado: number): Observable<void> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<void>(`${this.baseUrl}/deletar/${codDado}`, {
      headers,
    });
  }
}
