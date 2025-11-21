import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private usuarioUrl = `${this.apiUrl}/usuario`;

  private usuarioLogadoSubject = new BehaviorSubject<DadoUsuarioDTO | null>(
    null
  );
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) {}

  // -------------------------------------------
  // 🔐 TOKEN
  // -------------------------------------------
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // -------------------------------------------
  // 🔑 LOGIN
  // -------------------------------------------
  login(email: string, senha: string): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  // -------------------------------------------
  // 👤 CARREGA PERFIL DO USUÁRIO LOGADO
  // (token já vai no interceptor)
  // -------------------------------------------
  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    return this.http.get<DadoUsuarioDTO>(`${this.usuarioUrl}/perfil`).pipe(
      map((usuario) => {
        this.usuarioLogadoSubject.next(usuario);
        return usuario;
      })
    );
  }

  // -------------------------------------------
  // 🚪 LOGOUT
  // -------------------------------------------
  logout() {
    localStorage.removeItem('token');
    this.usuarioLogadoSubject.next(null);
  }

  // -------------------------------------------
  // GET USER
  // -------------------------------------------
  getUsuarioLogado(): DadoUsuarioDTO | null {
    return this.usuarioLogadoSubject.value;
  }

  // -------------------------------------------
  // VERIFICA LOGIN
  // -------------------------------------------
  estaLogado(): boolean {
    return !!this.getToken();
  }

  // -------------------------------------------
  // VERIFICA ROLES
  // -------------------------------------------
  isAdmin(): boolean {
    return this.getUsuarioLogado()?.conta?.permissao === 'ROLE_ADMIN';
  }

  isFarmacia(): boolean {
    return this.getUsuarioLogado()?.conta?.permissao === 'ROLE_FARMACIA';
  }
}
