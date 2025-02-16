import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-quizquestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizquestions.component.html',
  styleUrls: ['./quizquestions.component.css']
})
export class QuizquestionsComponent implements OnInit {

  quizName: string = '';  
  quizId: number = 0;   // Store the fetched quiz ID
  timeLeft: number = 0; // 30 minutes in seconds
  interval: any;
  questions: any[] = [];
  submitted: boolean = false;
  score: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dbService: DbserviceService
  ) {}

  ngOnInit() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.id) {
      alert('Please log in to take the quiz.');
      this.router.navigate(['/login']);
      return;
    }
    
    // Get quizName from URL
    this.quizName = this.route.snapshot.paramMap.get('quizName') || '';
    if (!this.quizName) {
      alert('Invalid quiz name.');
      this.router.navigate(['/']);
      return;
    }

    // Fetch quiz ID using quizName
    this.fetchQuizId();
  }

  fetchQuizId() {
    this.dbService.getRecord('quizzes').subscribe((quizzes: any) => {
      const selectedQuiz = quizzes.find((quiz: any) => quiz.name === this.quizName);

      if (!selectedQuiz) {
        alert('Quiz not found.');
        this.router.navigate(['/']);
        return;
      }

      this.quizId = selectedQuiz.id; // Set quiz ID

       // Convert completion time (assumes it's in minutes) to seconds
       this.timeLeft = parseInt(selectedQuiz.complete_time, 10) * 60 || 1800; 


      // Fetch questions once we have the quiz ID
      this.fetchQuestions();
      console.log("questin",this.questions)
    }, (error) => {
      console.error('Error fetching quizzes:', error);
      alert('Failed to load quizzes.');
    });
  }

  fetchQuestions() {
    this.dbService.getRecord('questions').subscribe((questions: any) => {
      this.questions = questions
        .filter((q: any) => q.quiz === this.quizId)
        .map((q: any) => ({
          ...q,  
          selectedAnswer: '', // Initialize selected answer
          correctAnswer: q.correct_answer
        }));

        console.log("questions:",questions)

      if (this.questions.length === 0) {
        alert('No questions found for this quiz.');
        this.router.navigate(['/']);
      }

      // Start the countdown timer after loading questions
      this.startTimer();
    }, (error) => {
      console.error('Error fetching questions:', error);
      alert('Failed to load quiz questions.');
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        alert('Time is up! Submitting quiz.');
        this.submitQuiz();
      }
    }, 1000);
  }

  submitQuiz() {
    if (this.questions.some(q => !q.selectedAnswer)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    clearInterval(this.interval);
  
    this.score = this.questions.filter(q => q.selectedAnswer === q.correct_answer).length;
    this.submitted = true;
    this.storeResult();
  }

  storeResult() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (!user.id || !this.quizId) {
      console.error('Missing user ID or quiz ID:', user, this.quizId);
      alert('Invalid quiz or user data. Please try again.');
      return;
    }

    const result = {
      score: this.score,               // User's score
      total: this.questions.length,    // Total questions
      quiz: this.quizId,               // Store Quiz ID
      username: user.username          // Add username (if backend supports it)
    };

    console.log('Submitting result:', result); // Debugging log

    this.dbService.addRecord('results', result).subscribe({
      next: (res: any) => {
        console.log('Result stored successfully:', res);
        alert('Quiz submitted successfully!');
      },
      error: (error) => {
        console.error('Error storing result:', error);
        alert('Failed to submit quiz. Please try again.');
      }
    });
  }

}
