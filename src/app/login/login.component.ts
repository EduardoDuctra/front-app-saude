import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  standalone: false,
})
export class LoginComponent implements OnInit {
  email: string = '';
  senha: string = '';
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Carrega os dados do mock.json
    this.http.get<any>('assets/mock/mock.json').subscribe((res) => {
      // Como o JSON está dentro de { "usuario": {...} }, transformamos em array
      this.usuarios = [res.usuario];
    });
  }

  onSubmit() {
    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    // Procura usuário com email e senha corretos
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.conta.email === this.email && u.conta.senha === this.senha
    );

    if (usuarioEncontrado) {
      // Salva na sessão
      sessionStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      alert(`Login realizado! Bem-vindo, ${usuarioEncontrado.perfil.nome}`);
      // Aqui você pode redirecionar para o dashboard

      this.router.navigate(['/dashboard']);
    } else {
      alert('Email ou senha incorretos!');
    }
  }
}
