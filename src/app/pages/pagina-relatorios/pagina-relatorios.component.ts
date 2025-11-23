import { Component, Input, OnInit } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../DTO/RelatorioCompletoDTO';
import { RelatoriosService } from '../../service/relatorio.service';

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
  relatorioNovo: RelatorioCompletoDTO = {
    data: new Date().toISOString().split('T')[0],
  };

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.carregando = true;
    this.relatoriosService.listarTodosRelatoriosUsuarioLogado().subscribe({
      next: (res) => {
        this.relatorios = res;
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
      peso: relatorio.peso, // se undefined, backend ignora ou mantém null
      glicose: relatorio.glicose,
      colesterolHDL: relatorio.colesterolHDL,
      colesterolVLDL: relatorio.colesterolVLDL,
      creatina: relatorio.creatina,
      trigliceridio: relatorio.trigliceridio,
    };

    console.log('Relatório a ser enviado para o backend:', relatorioSalvar);

    this.relatoriosService.salvarRelatorio(relatorioSalvar).subscribe({
      next: (relatorioSalvo) => {
        console.log('Relatório salvo no backend:', relatorioSalvo);
        this.relatorios.push(relatorioSalvo);
        this.novoRelatorioAtivo = false;
        this.resetarRelatorioNovo();
      },
      error: (err) => console.error('Erro ao criar relatório', err),
    });
  }

  resetarRelatorioNovo() {
    this.relatorioNovo = {
      data: new Date().toISOString().split('T')[0],
    };
  }

  cancelarNovoRelatorio() {
    this.novoRelatorioAtivo = false;
    this.resetarRelatorioNovo();
  }

  editarRelatorio(relatorio: RelatorioCompletoDTO) {
    console.log('Editar relatório:', relatorio);
  }

  excluirRelatorio(relatorio: RelatorioCompletoDTO) {
    console.log('Excluir relatório:', relatorio);
  }
}
