import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';
import { AuthService } from '../service/auth.service';

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
    private router: Router,
    private authService: AuthService
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
      return;
    }

    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).subscribe({
      next: () => {
        this.authService.carregarUsuarioLogado().subscribe({
          next: (usuario) => {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));

            const role = usuario.conta.permissao;

            // 🔥 redirecionamento por role
            if (role === 'ROLE_FARMACIA') {
              this.router.navigate(['/dashboard-farmacia']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          error: () => alert('Erro ao carregar perfil do usuário.'),
        });
      },
      error: () => alert('Email ou senha incorretos!'),
    });
  }
}
