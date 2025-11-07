import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog7 } from './blog7';

describe('Blog7', () => {
  let component: Blog7;
  let fixture: ComponentFixture<Blog7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
