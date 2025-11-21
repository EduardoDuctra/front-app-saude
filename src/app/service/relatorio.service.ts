import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatoriosDTO } from '../../DTO/RelatoriosDTO';
import { RelatorioCompletoDTO } from '../../DTO/RelatorioCompletoDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  private baseUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  // -------------------------------------------
  // 📌 Listar por tipo
  // -------------------------------------------
  listarPorTipo(tipoDado: string): Observable<RelatoriosDTO[]> {
    return this.http.get<RelatoriosDTO[]>(
      `${this.baseUrl}/listar-por-tipo?tipoDado=${tipoDado}`
    );
  }

  // -------------------------------------------
  // 📌 Listar TODOS relatórios do usuário logado
  // -------------------------------------------
  listarTodosRelatoriosUsuarioLogado(): Observable<RelatorioCompletoDTO[]> {
    return this.http.get<RelatorioCompletoDTO[]>(
      `${this.baseUrl}/todos-usuario`
    );
  }

  // -------------------------------------------
  // 📌 Salvar Relatório
  // -------------------------------------------
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
