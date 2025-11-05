import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentoDTO } from '../../DTO/MedicamentoDTO';
import { MedicamentoService } from '../service/medicamento.service';

@Component({
  selector: 'app-modal-medicamento',
  standalone: false,
  templateUrl: './modal-medicamento.component.html',
  styleUrl: './modal-medicamento.component.css',
})
export class ModalMedicamentoComponent {
  @Input() show: boolean = false; // controla se o modal aparece
  @Input() medicamento: MedicamentoDTO | null = null; // medicamento selecionado

  @Output() fechar = new EventEmitter<void>(); // para fechar o modal
  @Output() medicamentoAtualizado = new EventEmitter<MedicamentoDTO>(); // para atualizar a lista no dashboard
  @Output() medicamentoRemovido = new EventEmitter<number>(); // codMedicamento removido

  constructor(private medService: MedicamentoService) {}

  fecharModal() {
    this.fechar.emit();
  }

  salvar() {
    if (!this.medicamento) return;

    this.medService.atualizarMedicamento(this.medicamento).subscribe({
      next: (updated: MedicamentoDTO) => {
        // preserva o nome
        const medicamentoComNome = {
          ...updated,
          nomeMedicamento: this.medicamento!.nomeMedicamento,
        };

        this.medicamentoAtualizado.emit(medicamentoComNome); // envia para o dashboard
        this.fecharModal();
      },
      error: (err: any) => console.error('Erro ao atualizar medicamento', err),
    });
  }

  excluir() {
    if (!this.medicamento) return;

    this.medService
      .excluirMedicamento(this.medicamento.codMedicamento)
      .subscribe({
        next: () => {
          this.medicamentoRemovido.emit(this.medicamento!.codMedicamento); // envia o codMedicamento removido
          this.fecharModal();
        },
        error: (err: any) => console.error('Erro ao excluir medicamento', err),
      });
  }
}
