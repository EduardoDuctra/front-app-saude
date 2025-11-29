import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //adiciona o token no cabeçalho das requisicões
  //intercepta todas as requisições HTTP -> sempre que tem um post/get/.... pega o token no service
  //services não precisam mais do token
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    //rotas liberadas
    if (
      req.url.endsWith('/login') ||
      req.url.includes('/usuario/salvar') ||
      req.url.includes('/farmacia/salvar')
    ) {
      return next.handle(req);
    }

    //se tiver logado/tiver token colcoa no BEARER
    if (token) {
      const autorizacao = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(autorizacao);
    }

    return next.handle(req);
  }
}
