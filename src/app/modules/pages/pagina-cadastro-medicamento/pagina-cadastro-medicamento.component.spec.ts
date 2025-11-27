import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCadastroMedicamentoComponent } from './pagina-cadastro-medicamento.component';

describe('PaginaCadastroMedicamentoComponent', () => {
  let component: PaginaCadastroMedicamentoComponent;
  let fixture: ComponentFixture<PaginaCadastroMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaCadastroMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCadastroMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
