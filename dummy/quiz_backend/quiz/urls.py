from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, QuestionViewSet, ResultViewSet, AdminViewSet, UserViewSet, signup , login_view , submit_result

router = DefaultRouter()
router.register('quizzes', QuizViewSet)
router.register('questions', QuestionViewSet)
router.register('results', ResultViewSet)
router.register('admins', AdminViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('submit-result/', submit_result, name='submit-result'),
]
