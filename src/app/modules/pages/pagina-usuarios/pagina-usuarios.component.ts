import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DadoFarmaciaDTO } from '../../../core/models/DTO/DadoFarmaciaDTO';
import { DadoUsuarioDTO } from '../../../core/models/DTO/DadoUsuarioDTO';
import { FarmaciaService } from '../../../core/service/farmacia.service';
import { UsuarioService } from '../../../core/service/usuario.service';

@Component({
  selector: 'app-pagina-usuarios',
  standalone: false,
  templateUrl: './pagina-usuarios.component.html',
  styleUrl: './pagina-usuarios.component.css',
})
export class PaginaUsuariosComponent {
  //dois tipos de usuario
  listaUsuarios: (DadoUsuarioDTO | DadoFarmaciaDTO)[] = [];
  tipo!: string;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tipoParam = params.get('tipo');
      if (!tipoParam) return;

      this.tipo = tipoParam;

      // 🎯 ESTE TRECHO VAI AQUI!
      if (this.tipo === 'farmacia') {
        this.farmaciaService.listarFarmacias().subscribe({
          next: (dados) => (this.listaUsuarios = dados),
          error: (err) => console.error('Erro ao carregar farmácias', err),
        });
      } else {
        this.usuarioService.listarUsuarios().subscribe({
          next: (dados) => (this.listaUsuarios = dados),
          error: (err) => console.error('Erro ao carregar usuários', err),
        });
      }
    });
  }
}
