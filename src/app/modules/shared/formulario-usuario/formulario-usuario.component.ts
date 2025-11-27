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
    //bloco de cadastro e validação form
    //tem os validadores e os campos obrigatórios

    //campo para farmácia
    //preenche os campos sexo e altura com valores pre definidos automaticamente
    if (this.tipoCadastro === 'farmacia' && this.farmacia) {
      const farmacia = this.farmacia;

      this.usuarioForm = this.fb.group({
        //FORM OBJETO USUARIO
        perfil: this.fb.group({
          //nome obirgatório
          nome: [farmacia.usuario.perfil.nome || '', Validators.required],

          //definidos automatico (o usuario nem vai ver isso)
          sexo: ['I', Validators.required],
          altura: [0.0, Validators.required],
        }),

        //aqui o usuário altera os dados como email, senha, cnpj e telefone
        conta: this.fb.group({
          //email e senha obrigatórios
          email: [
            farmacia.usuario.conta.email || '',
            [Validators.required, Validators.email],
          ],
          senha: [farmacia.usuario.conta.senha || '', Validators.required],

          permissao: ['ROLE_FARMACIA', Validators.required],
        }),

        //campos só da farmácia
        cnpj: [farmacia.cnpj || '', Validators.required],
        telefone: [farmacia.telefone || '', Validators.required],
      });
      return;
    }

    //para usuarios normais
    //altera os dados do perfil
    this.usuarioForm = this.fb.group({
      perfil: this.fb.group({
        //nome obrigatório
        nome: [this.usuario?.perfil.nome || '', Validators.required],
        sexo: [
          //pego o sexo se existir, se não existir, M é o padrão
          this.usuario?.perfil.sexo || 'M',
          Validators.required,
        ],
        altura: [
          //pego a altura se existir, se não existir, null
          this.usuario?.perfil.altura || null,
          Validators.required,
        ],
      }),

      //crio o objeto CONTA (backend)
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

      //aqui coloco os campos a mais para farmacia
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

      //se existe -> update
      if (this.isEditing) {
        this.farmaciaService.atualizarFarmacia(farmaciaPayload).subscribe({
          next: () => {
            alert('Farmácia atualizada com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => console.error(err),
        });
      } else {
        //não existe -> post/salvar
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
