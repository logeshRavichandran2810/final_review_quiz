import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../../services/dbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuiz: any = null;

  // Form fields
  newQuiz = { name: '', completeTime: '', questions: [] };
  newQuestion = { question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'easy' };

  constructor(private dbService: DbserviceService,public router: Router) {}

  ngOnInit() {
    this.loadQuizzes();
  }
  onscore(){
    this.router.navigate(['/studentscore',]);
  }
  // Fetch all quizzes from db.json
  loadQuizzes() {
    this.dbService.getRecord('quizzes').subscribe((data: any) => {
      this.quizzes = data;
    });
  }

  addQuiz() {
    if (!this.newQuiz.name.trim()) {
      alert('Quiz name cannot be empty.');
      return;
    }
  
    if (!this.newQuiz.completeTime.trim()) {
      alert('Please select a completion deadline.');
      return;
    }
  
    const newQuizData = {
      name: this.newQuiz.name,
      complete_time: this.newQuiz.completeTime.toString(), // Ensure string
      posted_date: new Date().toISOString(),
    };
  
    console.log("🔵 Sending quiz data:", JSON.stringify(newQuizData)); // 🛠 Debugging log
  
    this.dbService.addRecord('quizzes', newQuizData).subscribe(
      response => {
        console.log("✅ Quiz added successfully:", response);
        alert('Quiz added successfully!');
        this.newQuiz = { name: '', completeTime: '', questions: [] };
        this.loadQuizzes();
      },
      error => {
        console.error("❌ Error adding quiz:", error);
      }
    );
  }
  

  deleteQuiz(quizId: string) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.dbService.deleteRecord('quizzes', quizId).subscribe(() => {
        alert('Quiz deleted successfully!');
        this.loadQuizzes();
      });
    }
  }

  selectQuiz(quiz: any) {
    console.log("Selected Quiz:", quiz);
    this.selectedQuiz = quiz.id;  // Ensure quizId is stored
  }

  addQuestionToQuiz() {
    if (!this.selectedQuiz) {
      console.error("No quiz selected!");
      return;
    }
  
    const questionData = {
      quiz: this.selectedQuiz,
      question_text: this.newQuestion.question,
      options: this.newQuestion.options,
      correct_answer: this.newQuestion.correctAnswer,
      difficulty: this.newQuestion.difficulty
    };
    
  
    this.dbService.addRecord('questions', questionData).subscribe(
      response => {
        console.log("Question added successfully!", response);
        window.alert("Question Added Successfully");
      },
      error => {
        console.error("Error adding question:", error);
      }
    );
  }

  // limitLength(event: any, index: number) {
  //   const maxLength = 10; // Define max length
  //   if (event.target.value.length > maxLength) {
  //     this.newQuestion.options[index] = event.target.value.substring(0, maxLength);
  //     console.log("Input")
  //     // Optionally prevent further input:
  //     event.preventDefault();
  //   }
  // }



  limitLength(value: string, index: number) {
    const maxLength = 100; // Define a reasonable max length
    
    if (!this.newQuestion.options) {
      this.newQuestion.options = ['', '', '', '']; // Ensure array exists
    }
  
    this.newQuestion.options[index] = value.length > maxLength ? value.substring(0, maxLength) : value;
  
    console.log(`Updated Option ${index + 1}:`, this.newQuestion.options);
  }
  
  
  
  
  
  

  // limitLength(value: string, index: number) {
  //   const maxLength = 10;
  //   console.log(`Input changed for Option ${index + 1}:`, event);
  //   this.newQuestion.options[index] = value.length > maxLength ? value.substring(0, maxLength) : value;
  // }
  


  editQuestion(index: number) {
    const editedQuestion = prompt('Edit Question:', this.selectedQuiz.questions[index].question);
    if (editedQuestion) {
      this.selectedQuiz.questions[index].question = editedQuestion;

      const editedDifficulty = prompt('Edit Difficulty (easy, medium, hard):', this.selectedQuiz.questions[index].difficulty);
      if (editedDifficulty && ['easy', 'medium', 'hard'].includes(editedDifficulty.toLowerCase())) {
        this.selectedQuiz.questions[index].difficulty = editedDifficulty.toLowerCase();
      }

      this.dbService.updateRecord('quizzes', this.selectedQuiz.id, this.selectedQuiz).subscribe(() => {
        alert('Question updated successfully!');
        this.loadQuizzes();
      });
    }
  }


  editQuiz(quiz: any) {
    const updatedName = prompt('Edit Quiz Name:', quiz.name);
    if (updatedName) {
      quiz.name = updatedName;
  
      const updatedTime = prompt('Edit Completion Time:', quiz.complete_time);
      if (updatedTime) {
        quiz.complete_time = updatedTime;
      }
  
      this.dbService.updateRecord('quizzes', quiz.id, quiz).subscribe(() => {
        alert('Quiz updated successfully!');
        this.loadQuizzes();
      });
    }
  }
  
  

  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.selectedQuiz.questions.splice(index, 1);
      this.dbService.updateRecord('quizzes', this.selectedQuiz.id, this.selectedQuiz).subscribe(() => {
        alert('Question deleted successfully!');
        this.loadQuizzes();
      });
    }
  }
}