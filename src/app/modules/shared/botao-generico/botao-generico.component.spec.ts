import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoGenericoComponent } from './botao-generico.component';

describe('BotaoGenericoComponent', () => {
  let component: BotaoGenericoComponent;
  let fixture: ComponentFixture<BotaoGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotaoGenericoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
