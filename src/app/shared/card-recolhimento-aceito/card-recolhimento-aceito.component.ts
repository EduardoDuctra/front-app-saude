import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecolhimentoFarmaciaDTO } from '../../../DTO/RecolhimentoFarmaciaDTO';

@Component({
  selector: 'app-card-recolhimento-aceito',
  templateUrl: './card-recolhimento-aceito.component.html',
  styleUrls: ['./card-recolhimento-aceito.component.css'],
  standalone: false,
})
export class CardRecolhimentoAceitoComponent {
  @Input() item!: RecolhimentoFarmaciaDTO;

  @Output() concluir = new EventEmitter<number>();
}
