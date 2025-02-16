from django.db import models

class Quiz(models.Model):
    name = models.CharField(max_length=255)
    complete_time = models.CharField(max_length=50)
    posted_date = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    options = models.JSONField()
    correct_answer = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=50)

from django.db import models

class Result(models.Model):
    score = models.IntegerField()
    total = models.IntegerField()
    quiz = models.ForeignKey('Quiz', on_delete=models.CASCADE)
    username = models.CharField(max_length=255)  # Add username field
    submitted_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.username} - {self.quiz} - {self.score}/{self.total}"



from django.db import models

class Admin(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)  # You can hash this later

    def __str__(self):
        return self.username

from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=255)  # Store hashed password

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email



