import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadoFarmaciaDTO } from '../../DTO/DadoFarmaciaDTO';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  private baseUrl = 'http://localhost:8080/sistema-saude/farmacia';

  constructor(private http: HttpClient) {}

  salvarFarmacia(farmacia: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/salvar`, farmacia, { headers });
  }

  atualizarFarmacia(farmacia: any): Observable<any> {
    const token = sessionStorage.getItem('token') || '';

    console.log('Token:', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.baseUrl}/atualizar-farmacia`, farmacia, {
      headers,
    });
  }

  carregarFarmaciaLogada(): Observable<DadoFarmaciaDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<DadoFarmaciaDTO>(`${this.baseUrl}/perfil`, {
      headers,
    });
  }
}
