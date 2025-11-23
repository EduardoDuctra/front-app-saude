import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoRemedioComponent } from './botao-remedio.component';

describe('BotaoRemedioComponent', () => {
  let component: BotaoRemedioComponent;
  let fixture: ComponentFixture<BotaoRemedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotaoRemedioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoRemedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
