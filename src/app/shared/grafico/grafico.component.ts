import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
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
export class GraficoComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<'line'>;

  @Input() data!: ChartData<'line'>;

  ngAfterViewInit(): void {
    if (this.data) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.renderChart();
    }
  }

  private renderChart() {
    if (this.chart) {
      this.chart.destroy(); // destrói o chart anterior para não sobrepor
    }

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        plugins: {},
        scales: {
          x: {
            title: { display: true, text: 'Data' }, // eixo horizontal
          },
          y: {
            title: { display: true, text: 'Valor' }, // eixo vertical
            beginAtZero: true,
          },
        },
        elements: {
          point: {
            radius: 5,
            pointStyle: 'circle',
          },
        },
      },
    };

    this.chart = new Chart(this.chartRef.nativeElement, config);
  }
}
