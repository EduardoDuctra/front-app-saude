import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecolhimentoComponent } from './card-recolhimento.component';

describe('CardRecolhimentoComponent', () => {
  let component: CardRecolhimentoComponent;
  let fixture: ComponentFixture<CardRecolhimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRecolhimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecolhimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
