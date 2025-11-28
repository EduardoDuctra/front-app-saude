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
    //abertas
    this.recolhimentoService.listarSolicitacoesAbertas().subscribe({
      next: (solicitacoes) => {
        //pendentes e concluidos da farmacia logada e coloca em duas listas pelo status
        this.recolhimentoService.listarRecolhimentosFarmacia().subscribe({
          next: (listaFarmacia) => {
            this.pendentes = listaFarmacia.filter(
              (r) => r.status === 'PENDENTE'
            );
            this.concluidos = listaFarmacia.filter(
              (r) => r.status === 'CONCLUIDO'
            );

            //verificação para nao ter duplicação. Garante que um recolhimento concluido nao vai estar na aba pendente (filtro no front)
            const idsFarmacia = listaFarmacia.map((r) => r.codRecolhimento);

            this.solicitacoesAbertas = solicitacoes.filter(
              (s) =>
                s.codRecolhimento !== undefined &&
                !idsFarmacia.includes(s.codRecolhimento)
            );
          },
          error: (err) =>
            console.error('Erro ao carregar recolhimentos farmácia', err),
        });
      },
      error: (err) =>
        console.error('Erro ao carregar solicitações abertas', err),
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
