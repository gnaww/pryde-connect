from django.urls import path, include
from django.conf.urls import url
from .views import ProjectList, CreateProject, ProjectView, UserView, UserProjectsList,\
    LoggedInUserView, UserList, DeleteProject, AddCollaborator, DeleteUser, FilterProjects,\
    UpdateProject, HideProject, UpdateUser



# All of these endpoints begin with 'api/v1/'
urlpatterns = [

    path('users/', UserList.as_view()),
    path('user/', LoggedInUserView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('user/<int:pk>/update/', UpdateUser.as_view()),
    path('user/<int:pk>/delete/', DeleteUser.as_view()),
    path('user/<int:pk>/projects/', UserProjectsList.as_view()),

    path('projects/', ProjectList.as_view()),
    path('project/create/', CreateProject.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),
    path('project/<int:pk>/update/', UpdateProject.as_view()),
    path('project/<int:pk>/delete/', DeleteProject.as_view()),
    path('project/<int:pk>/collaborator/', AddCollaborator.as_view()),


    #TODO: finish filtering
    path('project/filter/', FilterProjects.as_view()),


    #TODO: write endpoint to flip showProjectOnProfile for collaborator relationships
    #TODO: test this endpoint!
    path('project/<int:pk>/hide/', HideProject.as_view()),
    #TODO: write endpoint to delete collaborators from project

]
