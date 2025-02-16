import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-studentscores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentscores.component.html',
  styleUrls: ['./studentscores.component.css']
})
export class StudentscoresComponent implements OnInit {
  studentScores: any[] = [];

  constructor(private dbService: DbserviceService) { }

  ngOnInit() {
    this.fetchScores();
  }

  fetchScores() {
    this.dbService.getRecord('results').subscribe((results: any) => {
      this.dbService.getRecord('quizzes').subscribe((quizzes: any) => {
        const quizMap = new Map(quizzes.map((q: any) => [q.id, q.name])); // ✅ Map quizId to quizName

        this.studentScores = results
          .map((result: any) => ({
            ...result,
            quizName: quizMap.get(result.quiz) || 'Unknown Quiz',  // Try 'quiz' if 'quiz_id' doesn't exist
            submittedAt: result.submitted_at && !isNaN(Date.parse(result.submitted_at))
              ? new Date(result.submitted_at)
              : null

          }))
          .sort((a: any, b: any) =>
            (b.submittedAt ? b.submittedAt.getTime() : 0) -
            (a.submittedAt ? a.submittedAt.getTime() : 0)
          );
      }, error => console.error('Error fetching quizzes:', error));
    }, error => console.error('Error fetching results:', error));
  }
}
