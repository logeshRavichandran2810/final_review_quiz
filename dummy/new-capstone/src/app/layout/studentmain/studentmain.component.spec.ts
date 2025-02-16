import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmainComponent } from './studentmain.component';

describe('StudentmainComponent', () => {
  let component: StudentmainComponent;
  let fixture: ComponentFixture<StudentmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
