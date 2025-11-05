import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatoriosDTO } from '../../DTO/RelatoriosDTO';
import { RelatorioCompletoDTO } from '../../DTO/RelatorioCompletoDTO';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  private baseUrl = 'http://localhost:8080/sistema-saude/relatorios';

  constructor(private http: HttpClient) {}

  listarPorTipo(tipoDado: string): Observable<RelatoriosDTO[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<RelatoriosDTO[]>(
      `${this.baseUrl}/listar-por-tipo?tipoDado=${tipoDado}`,
      { headers }
    );
  }

  listarTodosRelatoriosUsuarioLogado(): Observable<RelatorioCompletoDTO[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<RelatorioCompletoDTO[]>(
      `${this.baseUrl}/todos-usuario`,
      { headers }
    );
  }
}
