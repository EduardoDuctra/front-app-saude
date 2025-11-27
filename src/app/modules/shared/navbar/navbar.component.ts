import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { DadoUsuarioDTO } from '../../../core/models/DTO/DadoUsuarioDTO';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser: DadoUsuarioDTO | null = null;
  userRole: string = '';
  private usuarioSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioSub = this.authService.usuarioLogado$.subscribe((usuario) => {
      this.currentUser = usuario;
      this.isLoggedIn = !!usuario;
      this.userRole = usuario ? usuario.conta.permissao : '';
      console.log('Usuário logado:', usuario);
    });

    if (this.authService.estaLogado()) {
      this.authService.carregarUsuarioLogado().subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.usuarioSub) this.usuarioSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Usuário deslogado');
  }

  login() {
    this.router.navigate(['/login']);
    console.log('Abrir tela de login');
  }

  meusDados() {
    console.log('Abrir meus dados');

    if (!this.currentUser) {
      console.warn('Usuário não logado, não é possível abrir meus dados');
      return;
    }

    this.router.navigate(['/meus-dados'], {
      state: {
        usuario: this.currentUser,
        tipoCadastro:
          this.currentUser.conta.permissao === 'farmacia'
            ? 'farmacia'
            : 'usuario',
      },
    });
  }

  listarUsuarios() {
    console.log('Abrir lista de usuários');
    this.router.navigate(['/listar-usuarios', 'usuario']);
  }

  listarFarmacias() {
    console.log('Abrir lista de farmácias');
    this.router.navigate(['/listar-usuarios', 'farmacia']);
  }

  cadastrarMedicamento() {
    console.log('Abrir cadastro de medicamentos');
    this.router.navigate(['/cadastrar-medicamento']);
  }

  listarMedicamento() {
    console.log('Abrir listar medicamentos');
    this.router.navigate(['/listar-medicamentos']);
  }

  meusRelatorios() {
    console.log('Abrir meus relatórios');
    this.router.navigate(['/pagina-relatorios']);
  }

  irHome(): void {
    this.router.navigate(['/dashboard']);
    console.log('Indo para página inicial');
  }
}
