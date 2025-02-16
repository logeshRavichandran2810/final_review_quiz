import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentscoresComponent } from './studentscores.component';

describe('StudentscoresComponent', () => {
  let component: StudentscoresComponent;
  let fixture: ComponentFixture<StudentscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentscoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
