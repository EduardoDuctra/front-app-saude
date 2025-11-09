export interface RecolhimentoDTO {
  codRecolhimento?: number; // opcional, gerado pelo backend
  medicamento: {
    codMedicamento: number;
  };
  emailCliente?: string; // opcional, retornado pelo backend
  nomeMedicamento?: string; // opcional, retornado pelo backend
}
