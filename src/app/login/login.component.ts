import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  // ----------------------------
  // Getters SEM ternários
  // ----------------------------

  get emailVazio(): boolean {
    const campo = this.loginForm.get('email');
    if (!campo) return false;
    if (campo.hasError('required') && campo.touched) {
      return true;
    }
    return false;
  }

  get emailInvalido(): boolean {
    const campo = this.loginForm.get('email');
    if (!campo) return false;
    if (campo.hasError('email') && campo.touched) {
      return true;
    }
    return false;
  }

  get senhaVazia(): boolean {
    const campo = this.loginForm.get('senha');
    if (!campo) return false;
    if (campo.hasError('required') && campo.touched) {
      return true;
    }
    return false;
  }

  get formularioInvalido(): boolean {
    if (this.loginForm.invalid) {
      return true;
    }
    return false;
  }

  // ----------------------------
  // Lógica do LOGIN
  // (a mesma que você tinha antes)
  // ----------------------------

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Preencha todos os campos!');
      return;
    }

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    const loginData = { email, senha };

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

          const token = res.body?.token;

          if (!token) {
            alert('Token não recebido do backend!');
            return;
          }

          sessionStorage.setItem('token', token);

          // Buscar perfil do usuário
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });

          this.http
            .get<DadoUsuarioDTO>(
              'http://localhost:8080/sistema-saude/usuario/perfil',
              { headers }
            )
            .subscribe({
              next: (usuario) => {
                console.log('Usuário logado:', usuario);

                sessionStorage.setItem('usuario', JSON.stringify(usuario));

                // redireciona
                this.router.navigate(['/dashboard']);
              },
              error: () => {
                alert('Erro ao buscar dados do usuário!');
              },
            });
        },

        error: () => {
          alert('Email ou senha incorretos!');
        },
      });
  }
}
