from django.urls import path, include
from django.conf.urls import url

from .user_views import *
from .project_views import *
from .collaborator_views import *




# All of these endpoints begin with 'api/v1/'
urlpatterns = [

    path('users/', UserList.as_view()),
    path('user/', LoggedInUserView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('user/update/', UpdateUser.as_view()),
    path('user/<int:pk>/delete/', DeleteUser.as_view()),

    path('projects/', ProjectList.as_view()),
    path('project/create/', CreateProject.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),
    path('project/<int:pk>/update/', UpdateProject.as_view()),
    path('project/<int:pk>/delete/', DeleteProject.as_view()),
    path('project/<int:pk>/collaborator/', AddCollaborator.as_view()),


    #TODO: keep testing filter
    path('filter/', FilterProjects.as_view()),

    path('project/<int:pk>/togglevisibility/', ToggleProjectVisibility.as_view()),


    #TODO: write endpoint to delete collaborators from project





]
