import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoInfoComponent } from './botao-info.component';

describe('BotaoInfoComponent', () => {
  let component: BotaoInfoComponent;
  let fixture: ComponentFixture<BotaoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotaoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
