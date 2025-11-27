import { Component, OnInit } from '@angular/core';
import { RecolhimentoDTO } from '../../../core/models/DTO/RecolhimentoDTO';
import { RecolhimentoFarmaciaDTO } from '../../../core/models/DTO/RecolhimentoFarmaciaDTO';
import { RecolhimentoService } from '../../../core/service/recolhimento.service';

@Component({
  selector: 'app-dashboard-farmacia',
  templateUrl: './dashboard-farmacia.component.html',
  standalone: false,
  styleUrls: ['./dashboard-farmacia.component.css'],
})
export class DashboardFarmaciaComponent implements OnInit {
  solicitacoesAbertas: RecolhimentoDTO[] = [];
  pendentes: RecolhimentoFarmaciaDTO[] = [];
  concluidos: RecolhimentoFarmaciaDTO[] = [];

  constructor(private recolhimentoService: RecolhimentoService) {}

  //ao inicializar:
  //1. carregar as solicitações abertas
  //2. carregar os recolhimentos pendentes e concluídos
  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.recolhimentoService.listarSolicitacoesAbertas().subscribe({
      next: (lista) => {
        this.solicitacoesAbertas = lista;
      },
      error: (err) =>
        console.error('Erro ao carregar solicitações abertas', err),
    });

    this.recolhimentoService.listarRecolhimentosFarmacia().subscribe({
      next: (lista) => {
        this.pendentes = lista.filter((r) => r.status === 'PENDENTE');
        this.concluidos = lista.filter((r) => r.status === 'CONCLUIDO');
      },
      error: (err) =>
        console.error('Erro ao carregar recolhimentos da farmácia', err),
    });
  }

  //aceita o recolhimento e troca o status
  //não mostra mais na aba de solicitações abertas
  aceitarRecolhimento(codRecolhimento: number): void {
    this.recolhimentoService
      .atualizarStatus(codRecolhimento, 'PENDENTE')
      .subscribe(() => {
        this.solicitacoesAbertas = this.solicitacoesAbertas.filter(
          (item) => item.codRecolhimento !== codRecolhimento
        );

        this.carregarPendentesEConcluidos();
      });
  }

  //separa os pendentes de concluidos e lista na aba correspondente
  carregarPendentesEConcluidos(): void {
    this.recolhimentoService
      .listarRecolhimentosFarmacia()
      .subscribe((lista) => {
        this.pendentes = lista.filter((r) => r.status === 'PENDENTE');
        this.concluidos = lista.filter((r) => r.status === 'CONCLUIDO');
      });
  }

  concluirRecolhimento(codRecolhimento: number): void {
    this.recolhimentoService
      .atualizarStatus(codRecolhimento, 'CONCLUIDO')
      .subscribe({
        next: () => this.carregarDados(),
        error: (err) => console.error('Erro ao concluir recolhimento', err),
      });
  }
}
