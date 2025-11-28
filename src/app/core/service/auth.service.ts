import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DadoUsuarioDTO } from '../models/DTO/DadoUsuarioDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private usuarioUrl = `${this.apiUrl}/usuario`;

  //BehaviorSubject guarda o usuário logado
  //todos os componentes que estiverem inscritos serão atualizados automaticamente
  private usuarioLogadoSubject = new BehaviorSubject<DadoUsuarioDTO | null>(
    null
  );
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  // Observable -> sempre que o valor mudar (usuário, medicamento, etc),
  // todos os componentes inscritos são notificados automaticamente

  constructor(private http: HttpClient) {}

  //pego o token do localStorage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  //faz login e guarda o token no localStorage
  login(email: string, senha: string): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  // Faz requisição ao backend para obter os dados do usuário logado
  // e armazena o usuário no BehaviorSubject para que toda a aplicação seja atualizada
  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    return this.http.get<DadoUsuarioDTO>(`${this.usuarioUrl}/perfil`).pipe(
      map((usuario) => {
        this.usuarioLogadoSubject.next(usuario);
        return usuario;
      })
    );
  }

  //remove o token do localStorage e zera o BehaviorSubject
  logout() {
    localStorage.removeItem('token');
    this.usuarioLogadoSubject.next(null);
  }

  //retorna o usuário logado
  getUsuarioLogado(): DadoUsuarioDTO | null {
    return this.usuarioLogadoSubject.value;
  }

  estaLogado(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUsuarioLogado()?.conta?.permissao === 'ROLE_ADMIN';
  }

  isFarmacia(): boolean {
    return this.getUsuarioLogado()?.conta?.permissao === 'ROLE_FARMACIA';
  }
}
