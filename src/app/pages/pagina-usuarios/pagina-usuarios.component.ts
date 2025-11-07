import { Component } from '@angular/core';
import { DadoFarmaciaDTO } from '../../../DTO/DadoFarmaciaDTO';
import { DadoUsuarioDTO } from '../../../DTO/DadoUsuarioDTO';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FarmaciaService } from '../../service/farmacia.service';

@Component({
  selector: 'app-pagina-usuarios',
  standalone: false,
  templateUrl: './pagina-usuarios.component.html',
  styleUrl: './pagina-usuarios.component.css',
})
export class PaginaUsuariosComponent {
  listaUsuarios: (DadoUsuarioDTO | DadoFarmaciaDTO)[] = [];
  tipo!: string;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService
  ) {}

  ngOnInit(): void {
    // Pega o parâmetro 'tipo' da rota
    this.route.paramMap.subscribe((params) => {
      const tipoParam = params.get('tipo');
      if (!tipoParam) return;

      this.tipo = tipoParam;

      // Chama o serviço certo dependendo do tipo
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
