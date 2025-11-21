import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Se NÃO estiver logado → redireciona
    if (!this.auth.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Está logado → libera rota
    return true;
  }
}
