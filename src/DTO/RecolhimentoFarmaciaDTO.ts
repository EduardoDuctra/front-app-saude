export interface RecolhimentoFarmaciaDTO {
  codRecolhimento: number;
  emailCliente: string;
  nomeMedicamento: string;
  status?: 'PENDENTE' | 'CANCELADO' | 'CONCLUIDO'; // enum convertido para string
}
