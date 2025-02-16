from rest_framework import serializers
from .models import Quiz, Question, Result

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

from rest_framework import serializers
from .models import Result  # Import your Result model

class ResultSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)  # Add username field

    class Meta:
        model = Result
        fields = ['score', 'total', 'quiz', 'username']  # Include username


from rest_framework import serializers
from .models import Admin

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])  # Hash password before saving
        user.save()
        return user


from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

