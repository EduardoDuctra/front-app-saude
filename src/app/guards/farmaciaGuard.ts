import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null');

    if (usuario && usuario.conta?.permissao === 'ROLE_FARMACIA') {
      return true;
    }

    this.snackBar.open(
      'Acesso negado. Esta área é exclusiva para farmácias.',
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
