import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RelatorioCompletoDTO } from '../../../core/models/DTO/RelatorioCompletoDTO';

@Component({
  selector: 'app-card-relatorio',
  standalone: false,
  templateUrl: './card-relatorio.component.html',
  styleUrl: './card-relatorio.component.css',
})
export class CardRelatorioComponent {
  //paramentros que veem do comp pai
  @Input() relatorio!: RelatorioCompletoDTO;
  @Input() modoAdicionar = false;

  //avisar o comp pai dos cliques nos botões
  @Output() salvar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<RelatorioCompletoDTO>();
  @Output() excluir = new EventEmitter<RelatorioCompletoDTO>();

  get dataBR(): string {
    const data = new Date(this.relatorio.data);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  //funcoes que chamam eventos (metodos) no componente pai
  onSalvar() {
    this.salvar.emit(this.relatorio);
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
