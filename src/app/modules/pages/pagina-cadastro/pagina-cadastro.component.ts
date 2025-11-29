import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-cadastro',
  standalone: false,
  templateUrl: './pagina-cadastro.component.html',
  styleUrl: './pagina-cadastro.component.css',
})
export class PaginaCadastroComponent implements OnInit {
  tipoCadastro!: string;

  constructor(private route: ActivatedRoute) {}

  // inicializa o componente e obtem o tipo para abrir o form (é o mesmo form, mas com
  // parametros diferentes)
  //redireciona para a rota de cadrasto
  ngOnInit(): void {
    //se ele for para /cadastro/usuario -> pega o parametro 'usuario' e atribui a tipoCadastro -> valido nos outros forms
    this.tipoCadastro = this.route.snapshot.paramMap.get('tipo')!;
    console.log('Tipo de cadastro:', this.tipoCadastro);
  }
}
