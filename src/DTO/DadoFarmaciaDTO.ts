import { DadoUsuarioDTO } from './DadoUsuarioDTO';

export interface DadoFarmaciaDTO {
  usuario: DadoUsuarioDTO;
  cnpj: string;
  telefone: string;
}
