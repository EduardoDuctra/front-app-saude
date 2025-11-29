import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { BancoMedicamentoService } from '../../../core/service/bancoMedicamento.service';

@Component({
  selector: 'app-input-cadastro-medicamento',
  standalone: false,
  templateUrl: './input-cadastro-medicamento.component.html',
  styleUrl: './input-cadastro-medicamento.component.css',
})
export class InputCadastroMedicamentoComponent implements OnInit {
  medicamentoForm!: FormGroup;
  //ver se existe ou novo
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private bancoMedicamentoService: BancoMedicamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //cria formulario
    this.medicamentoForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.medicamentoForm.valid) {
      this.bancoMedicamentoService
        .cadastrarMedicamento(this.medicamentoForm.value)
        .subscribe({
          next: (res) => {
            this.medicamentoForm.reset();
            this.router.navigate(['/dashboard']);
          },
        });
    }
  }
}
