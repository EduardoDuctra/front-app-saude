export interface RecolhimentoDTO {
  codRecolhimento?: number;
  medicamento: {
    codMedicamento: number;
  };
  emailCliente?: string;
  nomeMedicamento?: string;
}
