import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog6 } from './blog6';

describe('Blog6', () => {
  let component: Blog6;
  let fixture: ComponentFixture<Blog6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
