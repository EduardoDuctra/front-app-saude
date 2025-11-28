import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosDTO } from '../../../core/models/DTO/DadosDTO';
import { IMCDTO } from '../../../core/models/DTO/IMCDTO';
import { MedicamentoDTO } from '../../../core/models/DTO/MedicamentoDTO';
import { RelatoriosDTO } from '../../../core/models/DTO/RelatoriosDTO';
import { DadosService } from '../../../core/service/dados.service';
import { MedicamentoService } from '../../../core/service/medicamento.service';
import { RelatoriosService } from '../../../core/service/relatorio.service';
import { UsuarioService } from '../../../core/service/usuario.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  modalAberto = false;
  modalTitulo = '';
  usuario: any = { medicamentos: [], dados: [], relatorios: [] };
  botoes: string[] = [
    'Peso',
    'Glicose',
    'Colesterol HDL',
    'Colesterol VLDL',
    'Creatina',
    'Triglicerídio',
  ];
  data: any = { labels: [], datasets: [] };

  show = false; //modal
  modoAdicionar = false;

  medicamentoSelecionado: MedicamentoDTO | null = null;

  constructor(
    private medService: MedicamentoService,
    private dadosService: DadosService,
    private relatoriosService: RelatoriosService,
    private usuarioService: UsuarioService
  ) {}

  //carrega o componente e: carrega os medicamentos + dados
  ngOnInit(): void {
    this.carregarMedicamentos();
    this.carregarDados();
  }

  //vai no service e busca o DTO com os dados (peso, glicose, ...)
  carregarDados() {
    this.dadosService.listarDadosUsuario().subscribe({
      next: (dados: DadosDTO[]) => {
        this.usuario.dados = dados;
      },
      error: (err) => console.error('Erro ao carregar dados', err),
    });
  }
  //lista de objetos medicamento DTO associados ao usuario logado
  carregarMedicamentos() {
    this.medService.listarMedicamentosUsuario().subscribe({
      next: (meds: MedicamentoDTO[]) => {
        this.usuario.medicamentos = meds;
      },
      error: (err) => console.error('Erro ao carregar medicamentos', err),
    });
  }

  //abre o modal do gráfico com o titulo do botão que clicou
  abrirModal(titulo: string) {
    this.modalTitulo = titulo;
    this.modalAberto = true;

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

    //função que lista os valores por tipo (ex.: peso)
    //monta o gráfico
    this.relatoriosService.listarPorTipo(tipoDado).subscribe({
      next: (relatorios: RelatoriosDTO[]) => {
        const labels = relatorios.map((r) => r.data);
        const valores = relatorios.map((r) => r.valor);

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
      },
      error: (err) => console.error('Erro ao buscar valores do relatório', err),
    });
  }

  atualizarListaMedicamento(updated: MedicamentoDTO) {
    const index = this.usuario.medicamentos.findIndex(
      (m: MedicamentoDTO) => m.codMedicamento === updated.codMedicamento
    );
    if (index >= 0) this.usuario.medicamentos[index] = updated;
  }

  removerDaLista(codMedicamento: number) {
    this.usuario.medicamentos = this.usuario.medicamentos.filter(
      (m: MedicamentoDTO) => m.codMedicamento !== codMedicamento
    );
  }

  tituloBotaoIMC = 'Calcular seu IMC';

  imc!: IMCDTO;

  calcularIMC() {
    this.usuarioService.calcularIMC().subscribe({
      next: (res) => {
        this.imc = res;
        this.tituloBotaoIMC = `${res.imc.toFixed(2)}`;
      },
      error: (err) => console.error(err),
    });
  }

  abrirModalAdicionarMedicamento() {
    this.modoAdicionar = true;
    this.show = true;
    this.medicamentoSelecionado = {
      nomeMedicamento: '',
      doseDiaria: 0,
      dataInicio: new Date().toISOString().split('T')[0],
      duracaoTratamento: 0,
    } as MedicamentoDTO;
  }

  //modal de medicamento já cadastrado - Atualizar
  //carrega os dados dele nos campos do form
  abrirModalEditarMedicamento(med: MedicamentoDTO) {
    this.modoAdicionar = false;
    this.show = true;
    this.medicamentoSelecionado = { ...med };
  }

  fecharModal() {
    this.modalAberto = false;
    this.show = false;
    this.modoAdicionar = false;
    this.medicamentoSelecionado = null;
  }
}
