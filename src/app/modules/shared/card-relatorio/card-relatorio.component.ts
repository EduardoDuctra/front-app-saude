import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../core/models/DTO/RelatorioCompletoDTO';

@Component({
  selector: 'app-card-relatorio',
  standalone: false,
  templateUrl: './card-relatorio.component.html',
  styleUrl: './card-relatorio.component.css',
})
export class CardRelatorioComponent {
  //recebo do comp pai
  @Input() relatorio!: RelatorioCompletoDTO;
  @Input() modoAdicionar = false;

  //eventos que vou notificar
  @Output() salvar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() excluir = new EventEmitter<RelatorioCompletoDTO>();

  get dataBR(): string {
    if (!this.relatorio?.data) return '';

    const [ano, mes, dia] = this.relatorio.data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  onSalvar() {
    this.salvar.emit(this.relatorio);
  }

  onCancelar() {
    this.cancelar.emit();
  }

  onExcluir() {
    this.excluir.emit(this.relatorio);
  }
}
