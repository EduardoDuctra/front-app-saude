import { BancoMedicamentoService } from './../service/bancoMedicamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicamentoService } from '../service/medicamento.service';

@Component({
  selector: 'app-input-cadastro-medicamento',
  standalone: false,
  templateUrl: './input-cadastro-medicamento.component.html',
  styleUrl: './input-cadastro-medicamento.component.css',
})
export class InputCadastroMedicamentoComponent implements OnInit {
  medicamentoForm!: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private bancoMedicamentoService: BancoMedicamentoService
  ) {}

  ngOnInit(): void {
    this.medicamentoForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.medicamentoForm.valid) {
      console.log('Medicamento cadastrado:', this.medicamentoForm.value);
      this.bancoMedicamentoService
        .cadastrarMedicamento(this.medicamentoForm.value)
        .subscribe({
          next: (res) => {
            console.log('Medicamento cadastrado:', res);
            // Limpa o formulário
            this.medicamentoForm.reset();
          },
          error: (err) => console.error('Erro ao cadastrar:', err),
        });
    }
  }
}
