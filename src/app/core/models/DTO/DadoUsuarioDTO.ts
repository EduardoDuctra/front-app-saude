export interface DadoUsuarioDTO {
  conta: {
    email: string;
    senha: string;
    permissao: string;
  };
  perfil: {
    nome: string;
    sexo: string;
    altura: number;
  };
}
