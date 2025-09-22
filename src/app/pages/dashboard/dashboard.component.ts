import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficoComponent } from '../../grafico/grafico.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @ViewChild(GraficoComponent) graficoComponent!: GraficoComponent;

  modalAberto = false;
  modalTitulo = '';
  usuario: any;
  botoes: string[] = [];

  data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Dataset',
        data: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 200 - 100)
        ),
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.5)',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  ngOnInit(): void {
    const usuarioJson = sessionStorage.getItem('usuario');
    if (usuarioJson) {
      this.usuario = JSON.parse(usuarioJson);

      // Pega o primeiro dado do usuário (ou itere todos se quiser)
      if (this.usuario.dados && this.usuario.dados.length > 0) {
        const primeiroDado = this.usuario.dados[0];

        // Gera um botão para cada propriedade relevante
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

    setTimeout(() => {
      if (this.graficoComponent?.chart) {
        this.graficoComponent.chart.update();
      }
    }, 0);
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
