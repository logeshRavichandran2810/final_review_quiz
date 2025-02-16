import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreatequizComponent } from './admincreatequiz.component';

describe('AdmincreatequizComponent', () => {
  let component: AdmincreatequizComponent;
  let fixture: ComponentFixture<AdmincreatequizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincreatequizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincreatequizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
