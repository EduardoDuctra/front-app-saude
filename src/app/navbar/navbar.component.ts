import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';

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
    // Inscreve na stream de usuário logado
    this.usuarioSub = this.authService.usuarioLogado$.subscribe((usuario) => {
      this.currentUser = usuario;
      this.isLoggedIn = !!usuario;
      this.userRole = usuario ? usuario.permissao : '';
      console.log('Usuário logado:', usuario); // 🔹 Debug do usuário
    });

    // Tenta carregar usuário logado ao iniciar
    if (this.authService.estaLogado()) {
      this.authService.carregarUsuarioLogado().subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.usuarioSub) this.usuarioSub.unsubscribe();
  }

  // Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redireciona para login
    console.log('Usuário deslogado');
  }

  // Login
  login() {
    this.router.navigate(['/login']); // redireciona para login
    console.log('Abrir tela de login');
  }

  // Menu usuário comum
  meusDados() {
    console.log('Abrir meus dados');
    this.router.navigate(['/meus-dados']);
  }

  // Menu admin
  listarUsuarios() {
    console.log('Abrir lista de usuários');
    this.router.navigate(['/listar-usuarios']);
  }

  cadastrarMedicamento() {
    console.log('Abrir cadastro de medicamentos');
    this.router.navigate(['/cadastrar-medicamento']);
  }

  meusRelatorios() {
    console.log('Abrir meus relatórios');
    this.router.navigate(['/pagina-relatorios']); // rota da sua página de relatórios
  }

  irHome(): void {
    this.router.navigate(['/dashboard']);
    console.log('Indo para página inicial');
  }

  listarFarmacias() {}
}
