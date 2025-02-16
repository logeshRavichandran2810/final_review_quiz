import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditquizComponent } from './admineditquiz.component';

describe('AdmineditquizComponent', () => {
  let component: AdmineditquizComponent;
  let fixture: ComponentFixture<AdmineditquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmineditquizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmineditquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
