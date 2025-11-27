import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DadoFarmaciaDTO } from '../models/DTO/DadoFarmaciaDTO';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  private baseUrl = `${environment.apiUrl}/farmacia`;

  constructor(private http: HttpClient) {}

  salvarFarmacia(farmacia: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar`, farmacia);
  }

  atualizarFarmacia(farmacia: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/atualizar-farmacia`, farmacia);
  }

  carregarFarmaciaLogada(): Observable<DadoFarmaciaDTO> {
    return this.http.get<DadoFarmaciaDTO>(`${this.baseUrl}/perfil`);
  }

  listarFarmacias(): Observable<DadoFarmaciaDTO[]> {
    return this.http.get<DadoFarmaciaDTO[]>(`${this.baseUrl}/listar-farmacias`);
  }
}
