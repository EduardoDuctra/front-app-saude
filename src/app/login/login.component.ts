import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  standalone: false,
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  onSubmit() {
    if (this.email && this.senha) {
      alert(`Email: ${this.email}\nSenha: ${this.senha}`);
    } else {
      alert('Preencha todos os campos!');
    }
  }
}
