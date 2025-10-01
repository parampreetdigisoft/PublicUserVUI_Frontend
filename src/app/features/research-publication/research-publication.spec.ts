import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPublication } from './research-publication';

describe('ResearchPublication', () => {
  let component: ResearchPublication;
  let fixture: ComponentFixture<ResearchPublication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchPublication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchPublication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
