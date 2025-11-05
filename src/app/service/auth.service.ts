import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/sistema-saude/usuario';

  // BehaviorSubject para armazenar o usuário logado
  private usuarioLogadoSubject = new BehaviorSubject<DadoUsuarioDTO | null>(
    null
  );
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { email, senha })
      .pipe(
        map((response) => {
          sessionStorage.setItem('token', response.token);
          this.carregarUsuarioLogado().subscribe(); // atualiza o BehaviorSubject
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.usuarioLogadoSubject.next(null);
  }

  carregarUsuarioLogado(): Observable<DadoUsuarioDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .get<DadoUsuarioDTO>(`${this.baseUrl}/perfil`, { headers })
      .pipe(
        map((usuario) => {
          console.log('Usuário logado:', usuario);
          this.usuarioLogadoSubject.next(usuario);
          return usuario;
        })
      );
  }

  getUsuarioLogado(): DadoUsuarioDTO | null {
    return this.usuarioLogadoSubject.value;
  }

  estaLogado(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
