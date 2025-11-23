import { Component, Input } from '@angular/core';
import { DadoUsuarioDTO } from '../../../DTO/DadoUsuarioDTO';
import { DadoFarmaciaDTO } from '../../../DTO/DadoFarmaciaDTO';

@Component({
  selector: 'app-card-usuario',
  standalone: false,
  templateUrl: './card-usuario.component.html',
  styleUrl: './card-usuario.component.css',
})
export class CardUsuarioComponent {
  @Input() item!: DadoUsuarioDTO | DadoFarmaciaDTO;

  // Verifica se o objeto é DadoFarmaciaDTO
  get isFarmacia(): boolean {
    return (this.item as DadoFarmaciaDTO).usuario !== undefined;
  }

  // Retorna os dados do usuário, seja DTO normal ou dentro do farmácia
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
