import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  //só usuários logados têm acesso as páginas protegidas
  canActivate(): boolean {
    if (!this.auth.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
