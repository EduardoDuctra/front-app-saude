import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-info',
  standalone: false,
  templateUrl: './botao-info.component.html',
  styleUrl: './botao-info.component.css',
})
export class BotaoInfoComponent {
  @Input() titulo: string = '';

  @Output() clickBotao = new EventEmitter<void>();

  onClick() {
    //diparar evento no componente pai
    this.clickBotao.emit();
  }
}
