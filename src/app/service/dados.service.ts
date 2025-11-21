import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private baseUrl = `${environment.apiUrl}/dados`;

  constructor(private http: HttpClient) {}

  listarDadosUsuario(): Observable<DadoDTO[]> {
    return this.http.get<DadoDTO[]>(`${this.baseUrl}/buscar-por-usuario`);
  }

  salvarDado(dado: Partial<DadoDTO>): Observable<DadoDTO> {
    return this.http.post<DadoDTO>(`${this.baseUrl}/salvar`, dado);
  }

  atualizarDado(dado: DadoDTO): Observable<DadoDTO> {
    return this.http.put<DadoDTO>(`${this.baseUrl}/atualizar`, dado);
  }

  excluirDado(codDado: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${codDado}`);
  }
}
