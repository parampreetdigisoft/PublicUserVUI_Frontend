import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCity } from './partner-city';

describe('PartnerCity', () => {
  let component: PartnerCity;
  let fixture: ComponentFixture<PartnerCity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerCity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerCity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
