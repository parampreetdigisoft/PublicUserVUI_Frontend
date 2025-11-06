import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog2 } from './blog2';

describe('Blog2', () => {
  let component: Blog2;
  let fixture: ComponentFixture<Blog2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
