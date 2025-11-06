import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { FarmaciaService } from '../service/farmacia.service';
import { DadoUsuarioDTO } from '../../DTO/DadoUsuarioDTO';
import { DadoFarmaciaDTO } from '../../DTO/DadoFarmaciaDTO';

@Component({
  selector: 'app-formulario-usuario',
  standalone: false,
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent implements OnInit, OnChanges {
  @Input() tipoCadastro!: string;
  @Input() usuario!: DadoUsuarioDTO | null;
  @Input() farmacia: DadoFarmaciaDTO | null | undefined;
  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private farmaciaService: FarmaciaService,
    private router: Router
  ) {}

  isEditing = false;

  ngOnInit(): void {
    this.isEditing = !!this.usuario;
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges chamado:', changes);
    if (changes['usuario'] && this.usuario) {
      console.log(
        'usuario recebido no FormularioUsuarioComponent:',
        this.usuario
      );
      this.isEditing = true;
      this.inicializarFormulario();
    }
  }

  private inicializarFormulario(): void {
    console.log(
      'Inicializando formulário com usuario: ',
      this.usuario,
      'tipoCadastro: ',
      this.tipoCadastro
    );

    if (this.tipoCadastro === 'farmacia' && this.farmacia) {
      const farmacia = this.farmacia;

      this.usuarioForm = this.fb.group({
        perfil: this.fb.group({
          nome: [farmacia.usuario.perfil.nome || '', Validators.required],
          sexo: ['I', Validators.required],
          altura: [0.0, Validators.required],
        }),
        conta: this.fb.group({
          email: [
            farmacia.usuario.conta.email || '',
            [Validators.required, Validators.email],
          ],
          senha: [farmacia.usuario.conta.senha || '', Validators.required],
          permissao: ['ROLE_FARMACIA', Validators.required],
        }),
        cnpj: [farmacia.cnpj || '', Validators.required],
        telefone: [farmacia.telefone || '', Validators.required],
      });
      return;
    }

    // Para usuário normal ou cadastro novo
    this.usuarioForm = this.fb.group({
      perfil: this.fb.group({
        nome: [this.usuario?.perfil.nome || '', Validators.required],
        sexo: [
          this.usuario?.perfil.sexo ||
            (this.tipoCadastro === 'farmacia' ? 'I' : 'M'),
          Validators.required,
        ],
        altura: [
          this.usuario?.perfil.altura ||
            (this.tipoCadastro === 'farmacia' ? 0.0 : null),
          Validators.required,
        ],
      }),
      conta: this.fb.group({
        email: [
          this.usuario?.conta.email || '',
          [Validators.required, Validators.email],
        ],
        senha: [this.usuario?.conta.senha || '', Validators.required],
        permissao: [
          this.usuario?.conta.permissao ||
            (this.tipoCadastro === 'farmacia' ? 'ROLE_FARMACIA' : 'usuario'),
          Validators.required,
        ],
      }),
      cnpj: [this.tipoCadastro === 'farmacia' ? '' : null],
      telefone: [this.tipoCadastro === 'farmacia' ? '' : null],
    });
  }

  onSubmit(): void {
    if (!this.usuarioForm.valid) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const formValue = this.usuarioForm.value;

    if (this.tipoCadastro === 'farmacia') {
      const farmaciaPayload = {
        usuario: {
          perfil: formValue.perfil,
          conta: formValue.conta,
        },
        cnpj: formValue.cnpj,
        telefone: formValue.telefone,
      };

      if (this.isEditing) {
        this.farmaciaService.atualizarFarmacia(farmaciaPayload).subscribe({
          next: () => {
            alert('Farmácia atualizada com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => console.error(err),
        });
      } else {
        this.farmaciaService.salvarFarmacia(farmaciaPayload).subscribe({
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

      if (this.isEditing) {
        this.usuarioService.atualizarUsuario(usuarioPayload).subscribe({
          next: () => {
            alert('Dados atualizados com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => console.error(err),
        });
      } else {
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
