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
  }

  login() {
    this.router.navigate(['/login']);
  }

  meusDados() {
    if (!this.currentUser) {
      return;
    }

    //se for ROLE_FARMACIA, o tipoCadastro vai ser farmacia
    this.router.navigate(['/meus-dados'], {
      state: {
        usuario: this.currentUser,
        tipoCadastro:
          this.currentUser.conta.permissao === 'ROLE_FARMACIA'
            ? 'farmacia'
            : 'usuario',
      },
    });
  }

  listarUsuarios() {
    this.router.navigate(['/listar-usuarios', 'usuario']);
  }

  listarFarmacias() {
    this.router.navigate(['/listar-usuarios', 'farmacia']);
  }

  cadastrarMedicamento() {
    this.router.navigate(['/cadastrar-medicamento']);
  }

  listarMedicamento() {
    this.router.navigate(['/listar-medicamentos']);
  }

  meusRelatorios() {
    this.router.navigate(['/pagina-relatorios']);
  }

  irHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
