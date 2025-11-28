import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  //ngOnInit -> inicializa assim que o componente é executado
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  //usuário clicou no campo email e deixou vazio -> erro
  get emailVazio(): boolean {
    const campo = this.loginForm.get('email');
    if (!campo) return false;
    if (campo.hasError('required') && campo.touched) {
      return true;
    }
    return false;
  }

  //usuário clicou no campo email e digitou um email inválido -> erro
  get emailInvalido(): boolean {
    const campo = this.loginForm.get('email');
    if (!campo) return false;
    if (campo.hasError('email') && campo.touched) {
      return true;
    }
    return false;
  }

  //usuário clicou no campo senha e deixou vazio -> erro
  get senhaVazia(): boolean {
    const campo = this.loginForm.get('senha');
    if (!campo) return false;
    if (campo.hasError('required') && campo.touched) {
      return true;
    }
    return false;
  }

  //verifica se o formulário está inválido
  get formularioInvalido(): boolean {
    if (this.loginForm.invalid) {
      return true;
    }
    return false;
  }

  //onSubmit -> quando manda o formulário
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, senha } = this.loginForm.value;

    //autenticação chamando o authService
    this.authService.login(email, senha).subscribe({
      next: () => {
        this.authService.carregarUsuarioLogado().subscribe({
          next: (usuario) => {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));

            const role = usuario.conta.permissao;

            //redireciona para essas páginas
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
