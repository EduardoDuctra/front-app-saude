import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDadosComponent } from './pagina-dados.component';

describe('PaginaDadosComponent', () => {
  let component: PaginaDadosComponent;
  let fixture: ComponentFixture<PaginaDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
