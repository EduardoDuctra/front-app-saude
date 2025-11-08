import { BancoMedicamentoDTO } from './BancoMedicamentoDTO';

export interface MedicamentoDTO {
  bancoMedicamentos?: BancoMedicamentoDTO;
  nomeMedicamento?: string;
  codMedicamento?: number;
  doseDiaria?: number;
  dataInicio?: string;
  duracaoTratamento?: number;
}
