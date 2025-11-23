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

  ngOnInit(): void {
    this.tipoCadastro = this.route.snapshot.paramMap.get('tipo')!;
    console.log('Tipo de cadastro:', this.tipoCadastro);
  }
}
