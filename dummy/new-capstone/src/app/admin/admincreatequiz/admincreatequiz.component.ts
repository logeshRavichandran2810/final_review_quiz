import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admincreatequiz',
  imports: [FormsModule,CommonModule],
  templateUrl: './admincreatequiz.component.html',
  styleUrl: './admincreatequiz.component.css'
})
export class AdmincreatequizComponent 
{
  quizName: string = '';
  quizTiming: string = '';
  questions: any[] = [];

  addQuestion() {
    this.questions.push({ question: '', answerType: 'multichoice' });
  }
  constructor(private router: Router) {}

  // createQuiz(quizData: any) {
  //   // Store quiz in local storage (Replace with API call later)
  //   let existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  //   existingQuizzes.push(quizData);
  //   localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));

  //   // ✅ Navigate to Admin Dashboard after quiz creation
  //   this.router.navigate(['/admin/dashboard']);
  // }
  createQuiz(event: Event) {
    event.preventDefault(); // Prevent page reload
    console.log('Quiz Created:', this.quizName, this.quizTiming, this.questions);
  }
  
}
