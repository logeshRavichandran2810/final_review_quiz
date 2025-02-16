import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewscoreComponent } from './adminviewscore.component';

describe('AdminviewscoreComponent', () => {
  let component: AdminviewscoreComponent;
  let fixture: ComponentFixture<AdminviewscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminviewscoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminviewscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
