import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoMedicamentoDTO } from '../../DTO/BancoMedicamentoDTO';

@Injectable({
  providedIn: 'root',
})
export class BancoMedicamentoService {
  private baseUrl = 'http://localhost:8080/sistema-saude/banco-medicamentos';

  constructor(private http: HttpClient) {}

  cadastrarMedicamento(med: { nome: string }): Observable<BancoMedicamentoDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<BancoMedicamentoDTO>(`${this.baseUrl}/salvar`, med, {
      headers,
    });
  }

  // Listar todos os medicamentos do usuário
  listarMedicamentos(): Observable<BancoMedicamentoDTO[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<BancoMedicamentoDTO[]>(
      `${this.baseUrl}/listar-todos`,
      { headers }
    );
  }

  // Deletar medicamento pelo id
  deletarMedicamento(id: number): Observable<void> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`, { headers });
  }
}
