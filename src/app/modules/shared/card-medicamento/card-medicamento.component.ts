import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BancoMedicamentoDTO } from '../../../core/models/DTO/BancoMedicamentoDTO';

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
    //notifica o comp pai
    this.excluir.emit(this.medicamento);
  }
}
