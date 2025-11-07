import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCadastroMedicamentoComponent } from './input-cadastro-medicamento.component';

describe('InputCadastroMedicamentoComponent', () => {
  let component: InputCadastroMedicamentoComponent;
  let fixture: ComponentFixture<InputCadastroMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCadastroMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCadastroMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
