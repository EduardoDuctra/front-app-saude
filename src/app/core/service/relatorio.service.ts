import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RelatorioCompletoDTO } from '../models/DTO/RelatorioCompletoDTO';
import { RelatoriosDTO } from '../models/DTO/RelatoriosDTO';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  private baseUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  listarPorTipo(tipoDado: string): Observable<RelatoriosDTO[]> {
    return this.http.get<RelatoriosDTO[]>(
      `${this.baseUrl}/listar-por-tipo?tipoDado=${tipoDado}`
    );
  }

  listarTodosRelatoriosUsuarioLogado(): Observable<RelatorioCompletoDTO[]> {
    return this.http.get<RelatorioCompletoDTO[]>(
      `${this.baseUrl}/todos-usuario`
    );
  }

  salvarRelatorio(
    relatorio: RelatorioCompletoDTO
  ): Observable<RelatorioCompletoDTO> {
    const payload = {
      data: relatorio.data,
      dados: {
        peso: Number(relatorio.peso),
        glicose: Number(relatorio.glicose),
        colesterolHDL: Number(relatorio.colesterolHDL),
        colesterolVLDL: Number(relatorio.colesterolVLDL),
        creatina: Number(relatorio.creatina),
        trigliceridio: Number(relatorio.trigliceridio),
      },
    };

    return this.http.post<RelatorioCompletoDTO>(
      `${this.baseUrl}/salvar`,
      payload
    );
  }
}
