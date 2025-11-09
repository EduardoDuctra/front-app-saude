// recolhimento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecolhimentoDTO } from '../../DTO/RecolhimentoDTO';

@Injectable({
  providedIn: 'root',
})
export class RecolhimentoService {
  private baseUrl = 'http://localhost:8080/sistema-saude/recolhimento';

  constructor(private http: HttpClient) {}

  solicitarRecolhimento(
    recolhimento: RecolhimentoDTO
  ): Observable<RecolhimentoDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<RecolhimentoDTO>(
      `${this.baseUrl}/salvar`,
      recolhimento,
      { headers }
    );
  }
}
