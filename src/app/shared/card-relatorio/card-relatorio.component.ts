import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../DTO/RelatorioCompletoDTO';

@Component({
  selector: 'app-card-relatorio',
  standalone: false,
  templateUrl: './card-relatorio.component.html',
  styleUrl: './card-relatorio.component.css',
})
export class CardRelatorioComponent {
  @Input() relatorio!: RelatorioCompletoDTO;
  @Input() modoAdicionar = false;

  @Output() salvar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() excluir = new EventEmitter<RelatorioCompletoDTO>();

  // Formata a data DD/MM/AAAA
  get dataBR(): string {
    const data = new Date(this.relatorio.data);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  onSalvar() {
    this.salvar.emit(this.relatorio); // envia o relatório para o pai
  }

  onCancelar() {
    this.cancelar.emit();
  }

  onEditar() {
    this.editar.emit(this.relatorio);
  }

  onExcluir() {
    this.excluir.emit(this.relatorio);
  }
}
