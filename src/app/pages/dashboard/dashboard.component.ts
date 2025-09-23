import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficoComponent } from '../../grafico/grafico.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  modalAberto = false;
  modalTitulo = '';
  usuario: any;
  botoes: string[] = [];
  data: any = { labels: [], datasets: [] };

  ngOnInit(): void {
    const usuarioJson = sessionStorage.getItem('usuario');
    if (usuarioJson) {
      this.usuario = JSON.parse(usuarioJson);
      if (this.usuario.dados && this.usuario.dados.length > 0) {
        this.botoes = [
          'Peso',
          'Glicose',
          'Colesterol HDL',
          'Colesterol VLDL',
          'Creatina',
          'Triglicerídio',
        ];
      }
    }
  }

  abrirModal(titulo: string) {
    this.modalTitulo = titulo;
    this.modalAberto = true;

    let campo = '';
    switch (titulo.toLowerCase()) {
      case 'peso':
        campo = 'peso';
        break;
      case 'glicose':
        campo = 'glicose';
        break;
      case 'colesterol hdl':
        campo = 'colesterolHDL';
        break;
      case 'colesterol vldl':
        campo = 'colesterolVLDL';
        break;
      case 'creatina':
        campo = 'creatina';
        break;
      case 'triglicerídio':
        campo = 'trigliceridio';
        break;
    }
    if (!campo) return;

    const valores = this.usuario.dados.map((d: any) => d[campo]);
    const labels = this.usuario.relatorios
      ? this.usuario.relatorios.map((r: any) => r.data)
      : this.usuario.dados.map((_: any, i: number) => `Dado ${i + 1}`);

    this.data = {
      labels,
      datasets: [
        {
          label: titulo,
          data: valores,
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.5)',
          pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 10,
        },
      ],
    };
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
