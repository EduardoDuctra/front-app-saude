import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BancoMedicamentoDTO } from '../../DTO/BancoMedicamentoDTO';

@Component({
  selector: 'app-card-medicamento',
  standalone: false,
  templateUrl: './card-medicamento.component.html',
  styleUrl: './card-medicamento.component.css',
})
export class CardMedicamentoComponent {
  @Input() medicamento!: BancoMedicamentoDTO;
  @Output() excluir = new EventEmitter<BancoMedicamentoDTO>();

  onExcluir() {
    this.excluir.emit(this.medicamento);
  }
}
