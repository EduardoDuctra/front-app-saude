import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-generico',
  standalone: false,
  templateUrl: './botao-generico.component.html',
  styleUrl: './botao-generico.component.css',
})
export class BotaoGenericoComponent {
  @Input() titulo: string = '';
}
