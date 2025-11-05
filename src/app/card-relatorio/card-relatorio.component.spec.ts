import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRelatorioComponent } from './card-relatorio.component';

describe('CardRelatorioComponent', () => {
  let component: CardRelatorioComponent;
  let fixture: ComponentFixture<CardRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
