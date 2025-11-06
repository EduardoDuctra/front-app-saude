import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmaciaService } from '../../service/farmacia.service';
import { AuthService } from '../../service/auth.service';
import { DadoUsuarioDTO } from '../../../DTO/DadoUsuarioDTO';
import { DadoFarmaciaDTO } from '../../../DTO/DadoFarmaciaDTO';

@Component({
  selector: 'app-meus-dados',
  standalone: false,
  templateUrl: './meus-dados.component.html',
  styleUrl: './meus-dados.component.css',
})
export class MeusDadosComponent implements OnInit {
  usuario: DadoUsuarioDTO | null = null;
  farmacia: DadoFarmaciaDTO | null = null;
  tipoCadastro: string = 'usuario';

  constructor(
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Primeiro carregamos o tipo do usuário (ou permissões)
    this.usuarioService.carregarUsuarioLogado().subscribe({
      next: (usuario) => {
        console.log('Usuario carregado no MeusDadosComponent:', usuario);

        this.tipoCadastro =
          usuario.conta.permissao === 'farmacia' ? 'farmacia' : 'usuario';

        if (this.tipoCadastro === 'farmacia') {
          // Se for farmácia, carregamos os dados completos da farmácia
          this.farmaciaService.carregarFarmaciaLogada().subscribe({
            next: (farmacia: DadoFarmaciaDTO) => {
              this.farmacia = farmacia;
              this.usuario = farmacia.usuario; // mantém compatibilidade com o formulário
            },
            error: (err) => console.error('Erro ao carregar farmácia:', err),
          });
        } else {
          this.usuario = usuario;
        }
      },
      error: (err) => console.error('Erro ao carregar usuário:', err),
    });
  }
}
