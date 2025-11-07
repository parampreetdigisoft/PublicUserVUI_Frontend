import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog5 } from './blog5';

describe('Blog5', () => {
  let component: Blog5;
  let fixture: ComponentFixture<Blog5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
