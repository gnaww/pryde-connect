from django.urls import path, include
from django.conf.urls import url
from .views import ProjectList, ProjectCreate, ProjectView, UserView, UserProjectList, SingleUser

# All of these endpoints begin with 'api/v1/'
urlpatterns = [
    path('project/', ProjectList.as_view()),
    path('project/create/', ProjectCreate.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),

    # path('user/<int:pk>/', SingleUser.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('user/<int:pk>/projects', UserProjectList.as_view()),
]