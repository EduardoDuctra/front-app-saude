import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está logado e tem o papel de FARMÁCIA
    if (this.authService.estaLogado() && this.authService.isFarmacia()) {
      return true;
    }

    // Se não for, redireciona para o login
    this.router.navigate(['/login']);
    return false;
  }
}
