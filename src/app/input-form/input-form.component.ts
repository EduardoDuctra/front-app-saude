import { Component } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  standalone: false,
})
export class InputFormComponent {
  email: string = '';
  senha: string = '';
  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
