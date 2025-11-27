import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecolhimentoDTO } from '../../../core/models/DTO/RecolhimentoDTO';

@Component({
  selector: 'app-card-recolhimento',
  templateUrl: './card-recolhimento.component.html',
  styleUrls: ['./card-recolhimento.component.css'],
  standalone: false,
})
export class CardRecolhimentoComponent {
  @Input() item!: RecolhimentoDTO;
  @Output() aceitar = new EventEmitter<number>();

  onAceitar() {
    //notifica o comp pai e passao o codRecolhimento
    this.aceitar.emit(this.item.codRecolhimento);
  }
}
