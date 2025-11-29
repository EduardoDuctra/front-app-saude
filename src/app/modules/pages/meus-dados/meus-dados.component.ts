import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadoFarmaciaDTO } from '../../../core/models/DTO/DadoFarmaciaDTO';
import { DadoUsuarioDTO } from '../../../core/models/DTO/DadoUsuarioDTO';
import { FarmaciaService } from '../../../core/service/farmacia.service';
import { UsuarioService } from '../../../core/service/usuario.service';

@Component({
  selector: 'app-meus-dados',
  standalone: false,
  templateUrl: './meus-dados.component.html',
  styleUrl: './meus-dados.component.css',
})
export class MeusDadosComponent implements OnInit {
  //tipos de usuario DTO
  usuario: DadoUsuarioDTO | null = null;
  farmacia: DadoFarmaciaDTO | null = null;
  tipoCadastro: string = 'usuario';

  constructor(
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService,
    private router: Router
  ) {}

  //inicializa a pagina e carrega os dados do usuário logado
  ngOnInit(): void {
    this.usuarioService.carregarUsuarioLogado().subscribe({
      next: (usuario) => {
        //listar o tipo de form de acordo com o tipo de usuário
        this.tipoCadastro =
          usuario.conta.permissao === 'ROLE_FARMACIA' ? 'farmacia' : 'usuario';

        //se for de farmacia chama o service dela, pq tem dados difetentes
        if (this.tipoCadastro === 'farmacia') {
          this.farmaciaService.carregarFarmaciaLogada().subscribe({
            next: (farmacia: DadoFarmaciaDTO) => {
              this.farmacia = farmacia;
              this.usuario = farmacia.usuario;
            },
          });
        } else {
          //se for usuário comum, carrega os dados normais
          this.usuario = usuario;
        }
      },
    });
  }
}
