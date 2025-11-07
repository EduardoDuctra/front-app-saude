import { Component } from '@angular/core';
import { BancoMedicamentoDTO } from '../../../DTO/BancoMedicamentoDTO';
import { BancoMedicamentoService } from '../../service/bancoMedicamento.service';

@Component({
  selector: 'app-pagina-listar-medicamentos',
  standalone: false,
  templateUrl: './pagina-listar-medicamentos.component.html',
  styleUrl: './pagina-listar-medicamentos.component.css',
})
export class PaginaListarMedicamentosComponent {
  listaMedicamentos: BancoMedicamentoDTO[] = [];

  constructor(private bancoMedicamentoService: BancoMedicamentoService) {}

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  carregarMedicamentos(): void {
    this.bancoMedicamentoService.listarMedicamentos().subscribe({
      next: (res) => (this.listaMedicamentos = res),
      error: (err) => console.error('Erro ao carregar medicamentos:', err),
    });
  }

  removerMedicamento(med: BancoMedicamentoDTO): void {
    // aqui assumo que você tenha algum identificador, por exemplo codMedicamento
    this.bancoMedicamentoService
      .deletarMedicamento(med.codNomeMedicamento!)
      .subscribe({
        next: () => {
          console.log('Medicamento excluído:', med.nome);
          // remove do array para atualizar a tela
          this.listaMedicamentos = this.listaMedicamentos.filter(
            (m) => m !== med
          );
        },
        error: (err) => console.error('Erro ao excluir medicamento:', err),
      });
  }
}
