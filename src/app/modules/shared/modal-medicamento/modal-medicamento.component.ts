import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoMedicamentoDTO } from '../../../core/models/DTO/BancoMedicamentoDTO';
import { MedicamentoDTO } from '../../../core/models/DTO/MedicamentoDTO';
import { RecolhimentoDTO } from '../../../core/models/DTO/RecolhimentoDTO';
import { BancoMedicamentoService } from '../../../core/service/bancoMedicamento.service';
import { MedicamentoService } from '../../../core/service/medicamento.service';
import { RecolhimentoService } from '../../../core/service/recolhimento.service';

@Component({
  selector: 'app-modal-medicamento',
  standalone: false,
  templateUrl: './modal-medicamento.component.html',
  styleUrl: './modal-medicamento.component.css',
})
export class ModalMedicamentoComponent implements OnInit, OnChanges {
  formMedicamento!: FormGroup;

  @Input() show: boolean = false;
  @Input() medicamento: MedicamentoDTO | null = null;
  @Input() modoAdicionar: boolean = false;

  @Output() fechar = new EventEmitter<void>();
  @Output() medicamentoAtualizado = new EventEmitter<MedicamentoDTO>();
  @Output() medicamentoRemovido = new EventEmitter<number>();
  @Output() medicamentoAdicionado = new EventEmitter<MedicamentoDTO>();

  listaMedicamentos: BancoMedicamentoDTO[] = [];

  constructor(
    private medService: MedicamentoService,
    private bancoService: BancoMedicamentoService,
    private recolhimentoService: RecolhimentoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.bancoService.listarMedicamentos().subscribe({
      next: (dados) => {
        this.listaMedicamentos = dados || [];
        console.log(
          'Medicamentos disponíveis no banco:',
          this.listaMedicamentos.map((m) => m.nome)
        );
      },
      error: (err) => console.error('Erro ao carregar medicamentos', err),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['medicamento'] && this.formMedicamento) {
      this.preencherFormulario();
    }
  }

  private criarFormulario() {
    this.formMedicamento = this.fb.group({
      nomeMedicamento: ['', Validators.required],
      doseDiaria: [null, [Validators.required, Validators.min(1)]],
      dataInicio: ['', Validators.required],
      duracaoTratamento: [null, [Validators.required, Validators.min(1)]],
    });

    this.preencherFormulario();
  }

  private preencherFormulario() {
    if (!this.medicamento) return;

    this.formMedicamento.patchValue({
      nomeMedicamento: this.medicamento.nomeMedicamento || '',
      doseDiaria: this.medicamento.doseDiaria ?? null,
      dataInicio: this.medicamento.dataInicio || '',
      duracaoTratamento: this.medicamento.duracaoTratamento ?? null,
    });
  }

  fecharModal() {
    this.fechar.emit();
  }

  solicitarRecolhimento() {
    if (!this.medicamento?.codMedicamento) {
      console.error('Nenhum medicamento selecionado.');
      return;
    }

    const recolhimento: RecolhimentoDTO = {
      medicamento: { codMedicamento: this.medicamento.codMedicamento },
    };

    this.recolhimentoService.solicitarRecolhimento(recolhimento).subscribe({
      next: (res) => {
        this.fecharModal();
        alert('Recolhimento solicitado com sucesso!');
      },
      error: (err) => console.error('Erro ao solicitar recolhimento', err),
    });
  }

  onSubmit() {
    if (this.formMedicamento.invalid) {
      this.formMedicamento.markAllAsTouched();
      return;
    }

    this.salvar();
  }

  salvar() {
    const valores = this.formMedicamento.value;

    const selecionado = this.listaMedicamentos.find(
      (m) => m.nome === valores.nomeMedicamento
    );

    if (!selecionado) {
      console.error('Nenhum medicamento selecionado no dropdown.');
      return;
    }

    const objetoParaEnviar: MedicamentoDTO & { codMedicamento: number } = {
      bancoMedicamentos: {
        codNomeMedicamento: selecionado.codNomeMedicamento,
        nome: selecionado.nome,
      },
      nomeMedicamento: selecionado.nome,
      codMedicamento: this.modoAdicionar
        ? 0
        : this.medicamento?.codMedicamento || 0,
      doseDiaria: valores.doseDiaria,
      dataInicio: valores.dataInicio,
      duracaoTratamento: valores.duracaoTratamento,
    };

    if (this.modoAdicionar) {
      this.medService.adicionarMedicamento(objetoParaEnviar).subscribe({
        next: (novo) => {
          this.medicamentoAdicionado.emit(novo);
          this.fecharModal();
        },
        error: (err) => console.error('Erro ao adicionar medicamento', err),
      });
    } else {
      this.medService.atualizarMedicamento(objetoParaEnviar).subscribe({
        next: (updated) => {
          this.medicamentoAtualizado.emit(updated);
          this.fecharModal();
          window.location.reload();
        },
        error: (err) => console.error('Erro ao atualizar medicamento', err),
      });
    }
  }

  excluir() {
    if (!this.medicamento) return;

    this.medService
      .excluirMedicamento(this.medicamento.codMedicamento!)
      .subscribe({
        next: () => {
          this.medicamentoRemovido.emit(this.medicamento!.codMedicamento!);
          this.fecharModal();
        },
        error: (err) => console.error('Erro ao excluir medicamento', err),
      });
  }
}
