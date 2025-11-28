import { Component, Input, OnInit } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../core/models/DTO/RelatorioCompletoDTO';
import { RelatoriosService } from '../../../core/service/relatorio.service';

@Component({
  selector: 'app-pagina-relatorios',
  standalone: false,
  templateUrl: './pagina-relatorios.component.html',
  styleUrl: './pagina-relatorios.component.css',
})
export class PaginaRelatoriosComponent implements OnInit {
  relatorios: RelatorioCompletoDTO[] = [];
  carregando = false;
  erro = '';

  novoRelatorioAtivo = false;

  relatorioNovo: RelatorioCompletoDTO = this.criarModeloRelatorio();

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  //crio um relatório inicicial para ser preenchido
  private criarModeloRelatorio(): RelatorioCompletoDTO {
    return {
      data: new Date().toISOString().split('T')[0],
      peso: undefined,
      glicose: undefined,
      colesterolHDL: undefined,
      colesterolVLDL: undefined,
      creatina: undefined,
      trigliceridio: undefined,
    };
  }

  //carrega os relatórios do usuário
  carregarRelatorios(): void {
    this.carregando = true;

    this.relatoriosService.listarTodosRelatoriosUsuarioLogado().subscribe({
      next: (res) => {
        this.relatorios = res ?? [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar relatórios', err);
        this.erro = 'Falha ao carregar relatórios.';
        this.carregando = false;
      },
    });
  }

  salvarNovoRelatorio(relatorio: Partial<RelatorioCompletoDTO>) {
    const relatorioSalvar: RelatorioCompletoDTO = {
      data: new Date().toISOString().split('T')[0],
      peso: relatorio.peso,
      glicose: relatorio.glicose,
      colesterolHDL: relatorio.colesterolHDL,
      colesterolVLDL: relatorio.colesterolVLDL,
      creatina: relatorio.creatina,
      trigliceridio: relatorio.trigliceridio,
    };

    this.relatoriosService.salvarRelatorio(relatorioSalvar).subscribe({
      next: (relatorioSalvo) => {
        //coloca o novo relatório na lista exibida na tela
        this.relatorios = [...this.relatorios, relatorioSalvo];
        this.novoRelatorioAtivo = false;
        this.resetarRelatorioNovo();
      },
      error: (err) => console.error('Erro ao criar relatório', err),
    });
  }

  resetarRelatorioNovo() {
    this.relatorioNovo = this.criarModeloRelatorio();
  }
}
