import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentoDTO } from '../../DTO/MedicamentoDTO';
import { MedicamentoService } from '../service/medicamento.service';
import { BancoMedicamentoService } from '../service/bancoMedicamento.service';
import { BancoMedicamentoDTO } from '../../DTO/BancoMedicamentoDTO';
import { RecolhimentoDTO } from '../../DTO/RecolhimentoDTO';
import { RecolhimentoService } from '../service/RecolhimentoService';

@Component({
  selector: 'app-modal-medicamento',
  standalone: false,
  templateUrl: './modal-medicamento.component.html',
  styleUrl: './modal-medicamento.component.css',
})
export class ModalMedicamentoComponent {
  @Input() show: boolean = false;
  @Input() medicamento: MedicamentoDTO | null = null;
  @Input() modoAdicionar: boolean = false;

  @Output() fechar = new EventEmitter<void>();
  @Output() medicamentoAtualizado = new EventEmitter<MedicamentoDTO>();
  @Output() medicamentoRemovido = new EventEmitter<number>();
  @Output() medicamentoAdicionado = new EventEmitter<MedicamentoDTO>();

  listaMedicamentos: BancoMedicamentoDTO[] = [];

  constructor(
    private medService: MedicamentoService,
    private bancoService: BancoMedicamentoService,
    private recolhimentoService: RecolhimentoService
  ) {}

  ngOnInit(): void {
    this.bancoService.listarMedicamentos().subscribe({
      next: (dados) => {
        this.listaMedicamentos = dados || [];
        console.log(
          '📦 Medicamentos disponíveis no banco:',
          this.listaMedicamentos.map((m) => m.nome)
        );
      },
      error: (err) => console.error('❌ Erro ao carregar medicamentos', err),
    });
  }

  fecharModal() {
    this.fechar.emit();
  }

  solicitarRecolhimento() {
    if (!this.medicamento?.codMedicamento) {
      console.error('❌ Nenhum medicamento selecionado.');
      return;
    }

    const recolhimento: RecolhimentoDTO = {
      medicamento: { codMedicamento: this.medicamento.codMedicamento },
    };

    this.recolhimentoService.solicitarRecolhimento(recolhimento).subscribe({
      next: (res) => {
        console.log('✅ Recolhimento solicitado:', res);
        this.fecharModal();
        alert('Recolhimento solicitado com sucesso!');
      },
      error: (err) => console.error('❌ Erro ao solicitar recolhimento', err),
    });
  }

  salvar() {
    if (!this.medicamento) return;

    // Busca o medicamento selecionado no dropdown
    const selecionado = this.listaMedicamentos.find(
      (m) => m.nome === this.medicamento?.nomeMedicamento
    );

    if (!selecionado) {
      console.error('❌ Nenhum medicamento selecionado no dropdown.');
      return;
    }

    // Verifica se temos codMedicamento (necessário para atualização)
    if (!this.modoAdicionar && !this.medicamento.codMedicamento) {
      console.error(
        '❌ Medicamento sem codMedicamento não pode ser atualizado.'
      );
      return;
    }

    // Monta o objeto no formato esperado pelo backend
    const objetoParaEnviar: MedicamentoDTO & { codMedicamento: number } = {
      bancoMedicamentos: {
        codNomeMedicamento: selecionado.codNomeMedicamento,
        nome: selecionado.nome,
      },
      nomeMedicamento: selecionado.nome,
      codMedicamento: this.medicamento.codMedicamento || 0, // 0 no caso de adicionar
      doseDiaria: this.medicamento.doseDiaria!,
      dataInicio: this.medicamento.dataInicio!,
      duracaoTratamento: this.medicamento.duracaoTratamento!,
    };

    if (this.modoAdicionar) {
      // ✅ Adição
      this.medService.adicionarMedicamento(objetoParaEnviar).subscribe({
        next: (novo) => {
          this.medicamentoAdicionado.emit(novo);
          this.fecharModal();
        },
        error: (err) => console.error('❌ Erro ao adicionar medicamento', err),
      });
    } else {
      // ✅ Atualização
      this.medService.atualizarMedicamento(objetoParaEnviar).subscribe({
        next: (updated) => {
          this.medicamentoAtualizado.emit(updated);
          this.fecharModal();
          window.location.reload();
        },
        error: (err) => console.error('❌ Erro ao atualizar medicamento', err),
      });
    }
  }

  excluir() {
    if (!this.medicamento) return;

    this.medService
      .excluirMedicamento(this.medicamento.codMedicamento!)
      .subscribe({
        next: () => {
          this.medicamentoRemovido.emit(this.medicamento!.codMedicamento!);
          this.fecharModal();
        },
        error: (err) => console.error('Erro ao excluir medicamento', err),
      });
  }
}
