import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficoComponent } from '../../grafico/grafico.component';
import {
  Medicamento,
  MedicamentoService,
} from '../../service/medicamento.service';
import { MedicamentoDTO } from '../../../DTO/MedicamentoDTO';
import { DadosService } from '../../service/dados.service';
import { DadosDTO } from '../../../DTO/DadosDTO';
import { RelatoriosService } from '../../service/relatorio.service';
import { RelatoriosDTO } from '../../../DTO/RelatoriosDTO';
import { UsuarioService } from '../../service/usuario.service';
import { IMCDTO } from '../../../DTO/IMCDTO';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  modalAberto = false;
  modalTitulo = '';
  usuario: any = { medicamentos: [], dados: [], relatorios: [] }; // 🔹 Inicializa medicamentos vazio
  botoes: string[] = [];
  data: any = { labels: [], datasets: [] };

  medicamentoSelecionado: MedicamentoDTO | null = null;

  constructor(
    private medService: MedicamentoService,
    private dadosService: DadosService,
    private relatoriosService: RelatoriosService,
    private usuarioService: UsuarioService
  ) {} // 🔹 Injeta o serviço de medicamento

  ngOnInit(): void {
    // 🔹 Carrega os medicamentos do usuário via endpoint
    this.carregarMedicamentos();

    this.carregarDados();

    //   // Mantém a lógica original do front para os dados
    //   const usuarioJson = sessionStorage.getItem('usuario');
    //   if (usuarioJson) {
    //     this.usuario = JSON.parse(usuarioJson);
    //     if (this.usuario.dados && this.usuario.dados.length > 0) {
    //       this.botoes = [
    //         'Peso',
    //         'Glicose',
    //         'Colesterol HDL',
    //         'Colesterol VLDL',
    //         'Creatina',
    //         'Triglicerídio',
    //       ];
    //     }
    //   }
  }

  carregarDados() {
    this.dadosService.listarDadosUsuario().subscribe({
      next: (dados: DadosDTO[]) => {
        this.usuario.dados = dados;
        console.log('Dados do usuário:', this.usuario.dados);

        if (dados.length > 0) {
          // Pega as chaves do primeiro objeto que são relevantes para criar os botões
          const exemplo = dados[0];
          this.botoes = [];

          if (exemplo.peso !== undefined) this.botoes.push('Peso');
          if (exemplo.glicose !== undefined) this.botoes.push('Glicose');
          if (exemplo.colesterolHDL !== undefined)
            this.botoes.push('Colesterol HDL');
          if (exemplo.colesterolVLDL !== undefined)
            this.botoes.push('Colesterol VLDL');
          if (exemplo.creatina !== undefined) this.botoes.push('Creatina');
          if (exemplo.trigliceridio !== undefined)
            this.botoes.push('Triglicerídio');
        }
      },
      error: (err) => console.error('Erro ao carregar dados', err),
    });
  }

  // 🔹 Função para buscar medicamentos do usuário
  carregarMedicamentos() {
    this.medService.listarMedicamentosUsuario().subscribe({
      next: (meds: MedicamentoDTO[]) => {
        this.usuario.medicamentos = meds; // 🔹 Preenche o array de medicamentos
        console.log('Medicamentos do usuário:', this.usuario.medicamentos);
      },
      error: (err) => console.error('Erro ao carregar medicamentos', err),
    });
  }

  abrirModal(titulo: string) {
    this.modalTitulo = titulo;
    this.modalAberto = true;

    // Converte o título do botão para o parâmetro esperado no backend
    let tipoDado = '';
    switch (titulo.toLowerCase()) {
      case 'peso':
        tipoDado = 'peso';
        break;
      case 'glicose':
        tipoDado = 'glicose';
        break;
      case 'colesterol hdl':
        tipoDado = 'colesterolHDL';
        break;
      case 'colesterol vldl':
        tipoDado = 'colesterolVLDL';
        break;
      case 'creatina':
        tipoDado = 'creatina';
        break;
      case 'triglicerídio':
        tipoDado = 'trigliceridio';
        break;
    }

    if (!tipoDado) return;

    // Busca os valores do backend via RelatorioService
    this.relatoriosService.listarPorTipo(tipoDado).subscribe({
      next: (relatorios: RelatoriosDTO[]) => {
        // labels → datas, valores → valores do relatório
        const labels = relatorios.map((r) => r.data);
        const valores = relatorios.map((r) => r.valor);

        this.data = {
          labels,
          datasets: [
            {
              label: titulo, // Título da métrica
              data: valores, // Valores do relatório
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              pointStyle: 'circle',
              pointRadius: 6,
              pointHoverRadius: 10,
            },
          ],
        };
      },
      error: (err) => console.error('Erro ao buscar valores do relatório', err),
    });
  }

  fecharModal() {
    this.modalAberto = false;
  }

  // Atualiza a lista de medicamentos quando um medicamento é salvo
  atualizarListaMedicamento(updated: MedicamentoDTO) {
    const index = this.usuario.medicamentos.findIndex(
      (m: MedicamentoDTO) => m.codMedicamento === updated.codMedicamento
    );
    if (index >= 0) this.usuario.medicamentos[index] = updated;
  }

  // Remove o medicamento da lista quando ele é excluído
  removerDaLista(codMedicamento: number) {
    this.usuario.medicamentos = this.usuario.medicamentos.filter(
      (m: MedicamentoDTO) => m.codMedicamento !== codMedicamento
    );
  }

  tituloBotaoIMC = 'Calcular seu IMC';

  imc!: IMCDTO; // recebe o objeto IMC

  calcularIMC() {
    this.usuarioService.calcularIMC().subscribe({
      next: (res) => {
        this.imc = res;
        this.tituloBotaoIMC = `${res.imc.toFixed(2)}`;
      },
      error: (err) => console.error(err),
    });
  }
}
