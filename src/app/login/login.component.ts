import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const loginData = {
      email: this.email,
      senha: this.senha,
    };

    // Login no backend
    this.http
      .post<any>('http://localhost:8080/sistema-saude/login', loginData, {
        observe: 'response',
      })
      .subscribe({
        next: (res) => {
          if (res.status !== 200) {
            alert('Email ou senha incorretos!');
            return;
          }

          const token = res.body.token;
          if (!token) {
            alert('Token não recebido do backend!');
            return;
          }

          // Salva o token na sessão
          sessionStorage.setItem('token', token);

          // Busca os dados do usuário logado
          this.http
            .get<DadoUsuarioDTO>(
              'http://localhost:8080/sistema-saude/usuario/perfil',
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .subscribe({
              next: (usuario) => {
                console.log('Usuário logado:', usuario);

                // Salva usuário completo na sessão
                sessionStorage.setItem('usuario', JSON.stringify(usuario));

                // Redireciona para o dashboard
                this.router.navigate(['/dashboard']);
              },
              error: (err) => {
                console.error('Erro ao buscar usuário logado:', err);
                alert('Erro ao buscar dados do usuário!');
              },
            });
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert('Email ou senha incorretos!');
        },
      });
  }
}
