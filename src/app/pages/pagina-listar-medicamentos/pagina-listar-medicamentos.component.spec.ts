import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListarMedicamentosComponent } from './pagina-listar-medicamentos.component';

describe('PaginaListarMedicamentosComponent', () => {
  let component: PaginaListarMedicamentosComponent;
  let fixture: ComponentFixture<PaginaListarMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaListarMedicamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaListarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
