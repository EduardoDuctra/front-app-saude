import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSenhaComponent } from './input-senha.component';

describe('InputSenhaComponent', () => {
  let component: InputSenhaComponent;
  let fixture: ComponentFixture<InputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
