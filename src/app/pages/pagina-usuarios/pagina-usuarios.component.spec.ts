import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaUsuariosComponent } from './pagina-usuarios.component';

describe('PaginaUsuariosComponent', () => {
  let component: PaginaUsuariosComponent;
  let fixture: ComponentFixture<PaginaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
