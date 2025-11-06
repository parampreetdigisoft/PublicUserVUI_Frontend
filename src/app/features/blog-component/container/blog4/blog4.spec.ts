import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog4 } from './blog4';

describe('Blog4', () => {
  let component: Blog4;
  let fixture: ComponentFixture<Blog4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
