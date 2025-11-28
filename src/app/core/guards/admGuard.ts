import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // so usuários do tipo ROLE_ADMIN tem acesso
  canActivate(): boolean {
    const usuario = this.authService.getUsuarioLogado();

    if (usuario && usuario.conta.permissao === 'ROLE_ADMIN') {
      return true;
    }

    this.snackBar.open(
      'Acesso negado. Você não tem permissão para acessar esta página.',
      'Fechar',
      {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar'],
      }
    );

    this.router.navigate(['/login']);
    return false;
  }
}
