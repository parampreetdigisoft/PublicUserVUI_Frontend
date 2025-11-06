import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog1 } from './blog1';

describe('Blog1', () => {
  let component: Blog1;
  let fixture: ComponentFixture<Blog1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
