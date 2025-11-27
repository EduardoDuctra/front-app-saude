import { Component, Input } from '@angular/core';
import { DadoFarmaciaDTO } from '../../../core/models/DTO/DadoFarmaciaDTO';
import { DadoUsuarioDTO } from '../../../core/models/DTO/DadoUsuarioDTO';

@Component({
  selector: 'app-card-usuario',
  standalone: false,
  templateUrl: './card-usuario.component.html',
  styleUrl: './card-usuario.component.css',
})
export class CardUsuarioComponent {
  //recebe do comp pai um item (usuario ou farmacia)
  @Input() item!: DadoUsuarioDTO | DadoFarmaciaDTO;

  //se for farmacia, retorna true
  get isFarmacia(): boolean {
    return (this.item as DadoFarmaciaDTO).usuario !== undefined;
  }

  // Padroniza o acesso aos dados de usuário:
  // se for uma farmácia, retorna item.usuario; se for usuário comum, retorna o próprio item.
  //farmacia tem o campo usuario
  // Isso permite usar o mesmo componente para DadoUsuarioDTO e DadoFarmaciaDTO
  get usuario(): DadoUsuarioDTO {
    return this.isFarmacia
      ? (this.item as DadoFarmaciaDTO).usuario
      : (this.item as DadoUsuarioDTO);
  }

  get cnpj(): string | null {
    return this.isFarmacia ? (this.item as DadoFarmaciaDTO).cnpj : null;
  }

  get telefone(): string | null {
    return this.isFarmacia ? (this.item as DadoFarmaciaDTO).telefone : null;
  }
}
