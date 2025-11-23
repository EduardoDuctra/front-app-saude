import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components compartilhados
import { BotaoGenericoComponent } from './botao-generico/botao-generico.component';
import { BotaoInfoComponent } from './botao-info/botao-info.component';
import { CardMedicamentoComponent } from './card-medicamento/card-medicamento.component';
import { CardRecolhimentoComponent } from './card-recolhimento/card-recolhimento.component';
import { CardRecolhimentoAceitoComponent } from './card-recolhimento-aceito/card-recolhimento-aceito.component';
import { CardRelatorioComponent } from './card-relatorio/card-relatorio.component';
import { CardUsuarioComponent } from './card-usuario/card-usuario.component';
import { ContainerComponent } from './container/container.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { GraficoComponent } from './grafico/grafico.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalMedicamentoComponent } from './modal-medicamento/modal-medicamento.component';
import { InputFormComponent } from '../input-form/input-form.component';
import { InputCadastroMedicamentoComponent } from './input-cadastro-medicamento/input-cadastro-medicamento.component';
import { BotaoRemedioComponent } from './botao-remedio/botao-remedio.component';

@NgModule({
  declarations: [
    BotaoGenericoComponent,
    BotaoInfoComponent,
    BotaoRemedioComponent,
    CardMedicamentoComponent,
    CardRecolhimentoComponent,
    CardRecolhimentoAceitoComponent,
    CardRelatorioComponent,
    CardUsuarioComponent,
    ContainerComponent,
    FormularioUsuarioComponent,
    GraficoComponent,
    ModalComponent,
    ModalMedicamentoComponent,
    NavbarComponent,
    InputFormComponent,
    InputCadastroMedicamentoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    // Components
    BotaoGenericoComponent,
    BotaoInfoComponent,
    BotaoRemedioComponent,
    CardMedicamentoComponent,
    CardRecolhimentoComponent,
    CardRecolhimentoAceitoComponent,
    CardRelatorioComponent,
    CardUsuarioComponent,
    ContainerComponent,
    FormularioUsuarioComponent,
    GraficoComponent,
    ModalComponent,
    ModalMedicamentoComponent,
    NavbarComponent,
    InputFormComponent,
    InputCadastroMedicamentoComponent,

    // Forms & Material
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SharedModule {}
