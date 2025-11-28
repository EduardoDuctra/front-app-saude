import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-remedio',
  standalone: false,
  templateUrl: './botao-remedio.component.html',
  styleUrl: './botao-remedio.component.css',
})
export class BotaoRemedioComponent {
  //exibe os inputs do componente pai que vieram do backend
  @Input() nome!: string;
  @Input() doseDiaria!: number;
  @Input() dataInicio!: string;
  @Input() duracao!: number;

  ngOnInit() {}

  //usuario informa a quantidade de dias e calcula a data final
  get dataFim(): string {
    const inicio = new Date(this.dataInicio);
    inicio.setDate(inicio.getDate() + this.duracao - 1);
    return this.formatarDataBR(inicio);
  }

  //precisei editar o formato da data no formato certo
  formatarDataBR(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  get dataInicioBR(): string {
    return this.formatarDataBR(new Date(this.dataInicio));
  }
}
