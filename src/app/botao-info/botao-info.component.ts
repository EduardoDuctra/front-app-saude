import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-info',
  standalone: false,
  templateUrl: './botao-info.component.html',
  styleUrl: './botao-info.component.css',
})
export class BotaoInfoComponent {
  @Input() titulo: string = '';
}
