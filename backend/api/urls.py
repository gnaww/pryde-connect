from django.urls import path, include
from django.conf.urls import url
from .views import ProjectList, CreateProject, ProjectView, UserView, UserProjectsList, LoggedInUserView


# All of these endpoints begin with 'api/v1/'
urlpatterns = [
    path('project/', ProjectList.as_view()),
    path('project/create/', CreateProject.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),

    path('user/<int:pk>/', UserView.as_view()),
    path('user/', LoggedInUserView.as_view()),
    path('user/<int:pk>/projects', UserProjectsList.as_view())
]
