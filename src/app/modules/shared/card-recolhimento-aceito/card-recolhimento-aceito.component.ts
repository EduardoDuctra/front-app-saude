import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecolhimentoFarmaciaDTO } from '../../../core/models/DTO/RecolhimentoFarmaciaDTO';

@Component({
  selector: 'app-card-recolhimento-aceito',
  templateUrl: './card-recolhimento-aceito.component.html',
  styleUrls: ['./card-recolhimento-aceito.component.css'],
  standalone: false,
})
export class CardRecolhimentoAceitoComponent {
  //recebe o item do comp pai
  @Input() item!: RecolhimentoFarmaciaDTO;

  //envia evento para o comp pai. Chama a função no comp pai
  @Output() concluir = new EventEmitter<number>();
}
