import { Component, OnInit } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../DTO/RelatorioCompletoDTO';
import { RelatoriosService } from '../../service/relatorio.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-pagina-relatorios',
  standalone: false,
  templateUrl: './pagina-relatorios.component.html',
  styleUrl: './pagina-relatorios.component.css',
})
export class PaginaRelatoriosComponent implements OnInit {
  dataBusca: Date | null = null;

  buscarPorData() {
    console.log('Biscar por data');
  }

  resetarBusca(): void {
    this.dataBusca = null; // limpa a data
    this.carregarRelatorios(); // recarrega todos os relatórios
  }

  relatorios: RelatorioCompletoDTO[] = [];
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private relatoriosService: RelatoriosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  /**
   * Carrega todos os relatórios completos do usuário logado
   */
  carregarRelatorios(): void {
    this.carregando = true;
    this.relatoriosService.listarTodosRelatoriosUsuarioLogado().subscribe({
      next: (res: RelatorioCompletoDTO[]) => {
        this.relatorios = res;
        console.log('Relatórios carregados:', this.relatorios);
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar relatórios', err);
        this.erro = 'Falha ao carregar relatórios. Tente novamente.';
        this.carregando = false;
      },
    });
  }

  editarRelatorio(relatorio: RelatorioCompletoDTO): void {
    console.log('Editar relatório:', relatorio);
    // TODO: abrir modal ou redirecionar para página de edição
  }

  excluirRelatorio(relatorio: RelatorioCompletoDTO): void {
    console.log('Excluir relatório:', relatorio);
    // TODO: chamar service para excluir e depois recarregar a lista
  }
}
