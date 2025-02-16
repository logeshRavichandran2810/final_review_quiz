import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-studentdash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {

  quizzes: any[] = [];

  constructor(
    public router: Router,
    private dbService: DbserviceService
  ) {}

  ngOnInit(): void {
    // Fetch quizzes from db.json
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.dbService.getRecord('quizzes').subscribe((data: any) => {
      this.quizzes = data;
      console.log('quizdata',this.quizzes)
    });
  }
  onQuiz(quizName: string): void {
    this.router.navigate(['/quiz', quizName]);
  }
  onscore(){
    this.router.navigate(['/studentscore',]);
  }
}
