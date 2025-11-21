// recolhimento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecolhimentoDTO } from '../../DTO/RecolhimentoDTO';
import { RecolhimentoFarmaciaDTO } from '../../DTO/RecolhimentoFarmaciaDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecolhimentoService {
  private baseUrl = `${environment.apiUrl}/recolhimento`;

  constructor(private http: HttpClient) {}

  // ----------------------------------------------------------
  // 1) Solicitações ABERTAS (ninguém aceitou ainda)
  // ----------------------------------------------------------
  listarSolicitacoesAbertas(): Observable<RecolhimentoDTO[]> {
    return this.http.get<RecolhimentoDTO[]>(
      `${this.baseUrl}/listar-todas-solicitacao-recolhimento`
    );
  }

  // ----------------------------------------------------------
  // 2) Solicitações da FARMÁCIA (pendentes ou concluídas)
  // ----------------------------------------------------------
  listarRecolhimentosFarmacia(): Observable<RecolhimentoFarmaciaDTO[]> {
    return this.http.get<RecolhimentoFarmaciaDTO[]>(
      `${this.baseUrl}/listar-recolhimento-por-farmacia`
    );
  }

  // ----------------------------------------------------------
  // 3) Atualizar status (aceitar / concluir / cancelar)
  // ----------------------------------------------------------
  atualizarStatus(
    codRecolhimento: number,
    novoStatus: 'PENDENTE' | 'CONCLUIDO' | 'CANCELADO'
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/atualizar/${codRecolhimento}?novoStatus=${novoStatus}`,
      {}
    );
  }

  // ----------------------------------------------------------
  // 4) Solicitar recolhimento
  // ----------------------------------------------------------
  solicitarRecolhimento(
    recolhimento: RecolhimentoDTO
  ): Observable<RecolhimentoDTO> {
    return this.http.post<RecolhimentoDTO>(
      `${this.baseUrl}/salvar`,
      recolhimento
    );
  }
}
