import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { DadoFarmaciaDTO } from '../../../core/models/DTO/DadoFarmaciaDTO';
import { DadoUsuarioDTO } from '../../../core/models/DTO/DadoUsuarioDTO';
import { FarmaciaService } from '../../../core/service/farmacia.service';
import { UsuarioService } from '../../../core/service/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  standalone: false,
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent implements OnInit, OnChanges {
  @Input() tipoCadastro!: string;

  //recebe os DTOS para edição (vem do comp pai)
  @Input() usuario!: DadoUsuarioDTO | null;
  @Input() farmacia: DadoFarmaciaDTO | null | undefined;
  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService,
    private router: Router
  ) {}

  //editando true; novo false
  isEditing = false;

  ngOnInit(): void {
    //se existe -> update
    //novo usuario -> post
    this.isEditing = !!this.usuario;
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //detecta mudanças que ocorreram no comp pai (observable)
    //notifica o comp filho
    if (changes['usuario'] && this.usuario) {
      this.isEditing = true;
      this.inicializarFormulario();
    }
  }

  private inicializarFormulario(): void {
    // Se for cadastro ou edição de farmácia
    if (this.tipoCadastro === 'farmacia') {
      const farmaciaData = this.farmacia || {
        usuario: {
          perfil: { nome: '' },
          conta: { email: '', senha: '' },
        },
        cnpj: '',
        telefone: '',
      };

      //formGroup
      this.usuarioForm = this.fb.group({
        perfil: this.fb.group({
          nome: [farmaciaData.usuario.perfil.nome, Validators.required],
          sexo: ['I', Validators.required], // sexo fixo
          altura: [0.0, Validators.required], // altura fixa
        }),

        //crio o objeto USUARIO
        conta: this.fb.group({
          email: [
            farmaciaData.usuario.conta.email,
            [Validators.required, Validators.email],
          ],
          senha: [farmaciaData.usuario.conta.senha, Validators.required],
          permissao: ['ROLE_FARMACIA', Validators.required],
        }),

        cnpj: [farmaciaData.cnpj, Validators.required],
        telefone: [farmaciaData.telefone, Validators.required],
      });

      return;
    }

    // Caso contrário, cadastro/edição de usuário normal
    this.usuarioForm = this.fb.group({
      perfil: this.fb.group({
        nome: [this.usuario?.perfil.nome || '', Validators.required],
        sexo: [this.usuario?.perfil.sexo || 'M', Validators.required],
        altura: [this.usuario?.perfil.altura || null, Validators.required],
      }),

      conta: this.fb.group({
        email: [
          this.usuario?.conta.email || '',
          [Validators.required, Validators.email],
        ],
        senha: [this.usuario?.conta.senha || '', Validators.required],
        permissao: [
          this.usuario?.conta.permissao || 'usuario',
          Validators.required,
        ],
      }),

      cnpj: [null],
      telefone: [null],
    });
  }

  //ação que ocorre quando enviar o formulario
  onSubmit(): void {
    if (!this.usuarioForm.valid) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const formValue = this.usuarioForm.value;

    //quando eu envio, vejo se é um usuario do tipo farmacia para criar o objeto Farmacia
    if (this.tipoCadastro === 'farmacia') {
      const farmaciaForm = {
        usuario: {
          perfil: formValue.perfil,
          conta: formValue.conta,
        },
        cnpj: formValue.cnpj,
        telefone: formValue.telefone,
      };

      //se existe -> update
      if (this.isEditing) {
        this.farmaciaService.atualizarFarmacia(farmaciaForm).subscribe({
          next: () => {
            alert('Farmácia atualizada com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => console.error(err),
        });
      } else {
        //não existe -> post/salvar
        this.farmaciaService.salvarFarmacia(farmaciaForm).subscribe({
          next: () => {
            alert('Farmácia salva com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (err) => console.error(err),
        });
      }
    } else {
      const usuarioPayload = {
        perfil: formValue.perfil,
        conta: formValue.conta,
      };

      //se existe -> update
      if (this.isEditing) {
        this.usuarioService.atualizarUsuario(usuarioPayload).subscribe({
          next: () => {
            alert('Dados atualizados com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => console.error(err),
        });
      } else {
        //não existe -> post/salvar
        this.usuarioService.salvarUsuario(usuarioPayload).subscribe({
          next: () => {
            alert('Usuário salvo com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (err) => console.error(err),
        });
      }
    }
  }
}
