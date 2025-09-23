import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-remedio',
  standalone: false,
  templateUrl: './botao-remedio.component.html',
  styleUrl: './botao-remedio.component.css',
})
export class BotaoRemedioComponent {
  @Input() nome!: string;
  @Input() doseDiaria!: number;
  @Input() dataInicio!: string;
  @Input() duracao!: number;

  // Calcula a data de fim do tratamento
  get dataFim(): string {
    const inicio = new Date(this.dataInicio);
    inicio.setDate(inicio.getDate() + this.duracao - 1);
    return this.formatarDataBR(inicio);
  }

  // Formata qualquer data para DD/MM/AAAA
  formatarDataBR(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // meses começam do 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  // Formata a data de início também
  get dataInicioBR(): string {
    return this.formatarDataBR(new Date(this.dataInicio));
  }
}
