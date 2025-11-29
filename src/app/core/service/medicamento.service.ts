import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MedicamentoDTO } from '../models/DTO/MedicamentoDTO';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private baseUrl = `${environment.apiUrl}/medicamentos`;

  constructor(private http: HttpClient) {}

  listarMedicamentosUsuario(): Observable<MedicamentoDTO[]> {
    return this.http.get<MedicamentoDTO[]>(
      `${this.baseUrl}/buscar-por-usuario`
    );
  }

  //envio um objeto medicamento com o codMedicamento para atualizar
  atualizarMedicamento(
    med: MedicamentoDTO & { codMedicamento: number }
  ): Observable<MedicamentoDTO> {
    //envio para o backend o objeto medicamentoDTO (med)
    return this.http.put<MedicamentoDTO>(`${this.baseUrl}/atualizar`, med);
  }

  excluirMedicamento(codMedicamento: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${codMedicamento}`);
  }

  adicionarMedicamento(med: MedicamentoDTO): Observable<MedicamentoDTO> {
    return this.http.post<MedicamentoDTO>(`${this.baseUrl}/salvar`, med);
  }
}
