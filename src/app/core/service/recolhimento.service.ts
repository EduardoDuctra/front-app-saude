// recolhimento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecolhimentoDTO } from '../models/DTO/RecolhimentoDTO';
import { RecolhimentoFarmaciaDTO } from '../models/DTO/RecolhimentoFarmaciaDTO';

@Injectable({
  providedIn: 'root',
})
export class RecolhimentoService {
  private baseUrl = `${environment.apiUrl}/recolhimento`;

  constructor(private http: HttpClient) {}

  listarSolicitacoesAbertas(): Observable<RecolhimentoDTO[]> {
    return this.http.get<RecolhimentoDTO[]>(
      `${this.baseUrl}/listar-todas-solicitacao-recolhimento`
    );
  }

  listarRecolhimentosFarmacia(): Observable<RecolhimentoFarmaciaDTO[]> {
    return this.http.get<RecolhimentoFarmaciaDTO[]>(
      `${this.baseUrl}/listar-recolhimento-por-farmacia`
    );
  }

  // envio o codRecolhimento e o novo status pela URL para o backend. Atualizo o status no backend
  atualizarStatus(
    codRecolhimento: number,
    novoStatus: 'PENDENTE' | 'CONCLUIDO' | 'CANCELADO'
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/atualizar/${codRecolhimento}?novoStatus=${novoStatus}`,
      {}
    );
  }

  solicitarRecolhimento(
    recolhimento: RecolhimentoDTO
  ): Observable<RecolhimentoDTO> {
    return this.http.post<RecolhimentoDTO>(
      `${this.baseUrl}/salvar`,
      recolhimento
    );
  }
}
