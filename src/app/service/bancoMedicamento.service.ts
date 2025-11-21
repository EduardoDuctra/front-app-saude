import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoMedicamentoDTO } from '../../DTO/BancoMedicamentoDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BancoMedicamentoService {
  private baseUrl = `${environment.apiUrl}/banco-medicamentos`;

  constructor(private http: HttpClient) {}

  cadastrarMedicamento(med: { nome: string }): Observable<BancoMedicamentoDTO> {
    return this.http.post<BancoMedicamentoDTO>(`${this.baseUrl}/salvar`, med);
  }

  listarMedicamentos(): Observable<BancoMedicamentoDTO[]> {
    return this.http.get<BancoMedicamentoDTO[]>(`${this.baseUrl}/listar-todos`);
  }

  deletarMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }
}
