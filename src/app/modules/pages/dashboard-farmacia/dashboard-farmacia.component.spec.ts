import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFarmaciaComponent } from './dashboard-farmacia.component';

describe('DashboardFarmaciaComponent', () => {
  let component: DashboardFarmaciaComponent;
  let fixture: ComponentFixture<DashboardFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFarmaciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
