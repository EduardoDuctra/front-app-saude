import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecolhimentoAceitoComponent } from './card-recolhimento-aceito.component';

describe('CardRecolhimentoAceitoComponent', () => {
  let component: CardRecolhimentoAceitoComponent;
  let fixture: ComponentFixture<CardRecolhimentoAceitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRecolhimentoAceitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecolhimentoAceitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
