import { Component, OnInit } from '@angular/core';

import { RecolhimentoDTO } from '../../../DTO/RecolhimentoDTO';
import { RecolhimentoFarmaciaDTO } from '../../../DTO/RecolhimentoFarmaciaDTO';
import { RecolhimentoService } from '../../service/recolhimento.service';

@Component({
  selector: 'app-dashboard-farmacia',
  templateUrl: './dashboard-farmacia.component.html',
  standalone: false,
  styleUrls: ['./dashboard-farmacia.component.css'],
})
export class DashboardFarmaciaComponent implements OnInit {
  /** Solicitações criadas pelos usuários (sem status) */
  solicitacoesAbertas: RecolhimentoDTO[] = [];

  /** Solicitações aceitas pela farmácia */
  pendentes: RecolhimentoFarmaciaDTO[] = [];

  /** Solicitações concluídas pela farmácia */
  concluidos: RecolhimentoFarmaciaDTO[] = [];

  constructor(private recolhimentoService: RecolhimentoService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  /** Carrega todas as listas (abertas, pendentes, concluídos) */
  carregarDados(): void {
    // 1) Solicitações ABERTAS (usuários solicitaram)
    this.recolhimentoService.listarSolicitacoesAbertas().subscribe({
      next: (lista) => {
        this.solicitacoesAbertas = lista;
      },
      error: (err) =>
        console.error('Erro ao carregar solicitações abertas', err),
    });

    // 2) Solicitações da FARMÁCIA (pendentes + concluídos)
    this.recolhimentoService.listarRecolhimentosFarmacia().subscribe({
      next: (lista) => {
        this.pendentes = lista.filter((r) => r.status === 'PENDENTE');
        this.concluidos = lista.filter((r) => r.status === 'CONCLUIDO');
      },
      error: (err) =>
        console.error('Erro ao carregar recolhimentos da farmácia', err),
    });
  }

  /** Farmácia aceita a solicitação */
  aceitarRecolhimento(codRecolhimento: number): void {
    this.recolhimentoService
      .atualizarStatus(codRecolhimento, 'PENDENTE')
      .subscribe(() => {
        // remove da lista de solicitacoes abertas
        this.solicitacoesAbertas = this.solicitacoesAbertas.filter(
          (item) => item.codRecolhimento !== codRecolhimento
        );

        // recarrega pendentes/concluidos
        this.carregarPendentesEConcluidos();
      });
  }

  carregarPendentesEConcluidos(): void {
    this.recolhimentoService
      .listarRecolhimentosFarmacia()
      .subscribe((lista) => {
        this.pendentes = lista.filter((r) => r.status === 'PENDENTE');
        this.concluidos = lista.filter((r) => r.status === 'CONCLUIDO');
      });
  }

  /** Farmácia conclui o recolhimento */
  concluirRecolhimento(codRecolhimento: number): void {
    this.recolhimentoService
      .atualizarStatus(codRecolhimento, 'CONCLUIDO')
      .subscribe({
        next: () => this.carregarDados(),
        error: (err) => console.error('Erro ao concluir recolhimento', err),
      });
  }
}
