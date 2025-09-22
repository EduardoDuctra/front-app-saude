import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
  standalone: false,
})
export class GraficoComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<'line'>;

  @Input() data!: ChartData<'line'>;

  ngAfterViewInit(): void {
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Linha', // título fixo
          },
        },
        elements: {
          point: {
            radius: 5, // tamanho do marcador
            pointStyle: 'circle', // marcadores redondos
          },
        },
      },
    };

    this.chart = new Chart(this.chartRef.nativeElement, config);
  }
}
