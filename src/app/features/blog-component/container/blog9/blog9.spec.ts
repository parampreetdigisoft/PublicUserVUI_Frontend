import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog9 } from './blog9';

describe('Blog9', () => {
  let component: Blog9;
  let fixture: ComponentFixture<Blog9>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog9]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog9);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
