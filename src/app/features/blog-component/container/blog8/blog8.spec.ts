import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog8 } from './blog8';

describe('Blog8', () => {
  let component: Blog8;
  let fixture: ComponentFixture<Blog8>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog8]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog8);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
