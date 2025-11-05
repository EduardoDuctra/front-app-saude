import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicamentoDTO } from '../../DTO/MedicamentoDTO';

export interface Medicamento {
  codMedicamento: number;
  duracaoTratamento: number;
  dataInicio: string;
  doseDiaria: number;
  bancoMedicamentos: {
    codNomeMedicamento: number;
    nome: string;
  } | null;
}

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private baseUrl = 'http://localhost:8080/sistema-saude/medicamentos';

  constructor(private http: HttpClient) {}

  listarMedicamentosUsuario(): Observable<MedicamentoDTO[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<MedicamentoDTO[]>(
      `${this.baseUrl}/buscar-por-usuario`,
      { headers }
    );
  }

  atualizarMedicamento(
    med: MedicamentoDTO & { codMedicamento: number }
  ): Observable<MedicamentoDTO> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<MedicamentoDTO>(`${this.baseUrl}/atualizar`, med, {
      headers,
    });
  }

  excluirMedicamento(codMedicamento: number): Observable<void> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.baseUrl}/deletar/${codMedicamento}`, {
      headers,
    });
  }
}
