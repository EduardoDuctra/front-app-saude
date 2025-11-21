import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadoFarmaciaDTO } from '../../DTO/DadoFarmaciaDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  private baseUrl = `${environment.apiUrl}/farmacia`;

  constructor(private http: HttpClient) {}

  // -----------------------------
  // ✔ SALVAR FARMÁCIA (público)
  // -----------------------------
  salvarFarmacia(farmacia: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, farmacia);
  }

  // -----------------------------
  // ✔ ATUALIZAR FARMÁCIA (autenticado)
  // -----------------------------
  atualizarFarmacia(farmacia: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/atualizar-farmacia`, farmacia);
  }

  // -----------------------------
  // ✔ PERFIL FARMÁCIA LOGADA
  // -----------------------------
  carregarFarmaciaLogada(): Observable<DadoFarmaciaDTO> {
    return this.http.get<DadoFarmaciaDTO>(`${this.baseUrl}/perfil`);
  }

  // -----------------------------
  // ✔ LISTAR FARMÁCIAS (ADMIN)
  // -----------------------------
  listarFarmacias(): Observable<DadoFarmaciaDTO[]> {
    return this.http.get<DadoFarmaciaDTO[]>(`${this.baseUrl}/listar-farmacias`);
  }
}
