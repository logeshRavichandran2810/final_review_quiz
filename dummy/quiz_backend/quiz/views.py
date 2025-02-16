from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import Quiz, Question, Result, User, Admin
from .serializers import QuizSerializer, QuestionSerializer, ResultSerializer, UserSerializer, AdminSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    # Custom login API
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        admin = get_object_or_404(Admin, username=username, password=password)
        return Response({"message": "Login successful!", "admin": AdminSerializer(admin).data})

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = User.objects.filter(email=email).first()
            if user and user.check_password(password):
                return Response({"message": "Login successful!", "user": UserSerializer(user).data})
            return Response({"error": "Invalid credentials"}, status=400)

        return Response(serializer.errors, status=400)



@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!", "user": serializer.data}, status=201)
    return Response(serializer.errors, status=400)


from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import LoginSerializer

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, user.password):
            return Response({"message": "Login successful", "user_id": user.id, "username": user.username}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Result
from .serializers import ResultSerializer

@api_view(['POST'])
def submit_result(request):
    serializer = ResultSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Result stored successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
