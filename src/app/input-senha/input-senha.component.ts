import { Component } from '@angular/core';

@Component({
  selector: 'app-input-senha',
  standalone: false,
  templateUrl: './input-senha.component.html',
  styleUrl: './input-senha.component.css',
})
export class InputSenhaComponent {
  senha: string = '';
  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
