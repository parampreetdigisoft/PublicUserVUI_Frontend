import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog3 } from './blog3';

describe('Blog3', () => {
  let component: Blog3;
  let fixture: ComponentFixture<Blog3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
