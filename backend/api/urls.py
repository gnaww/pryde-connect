from django.urls import path, include
from django.conf.urls import url

from .user_views import UserList, UserView, LoggedInUserView, DeleteUser, UpdateUser, UploadOrChangeProfilePicture, UpdateEmail, GetEmailPreferences, CreateOrUpdateEmailPreferences, DeleteEmailPreferences
from .project_views import CreateProject, ProjectList, ProjectView, UpdateProject, \
    DeleteProject, UploadFile, DeleteFile
from .collaborator_views import GetProjectCollaborators, AddCollaborator, UpdateCollaboratorPermissions, DeleteCollaborator, ToggleProjectVisibility, LoggedInUserPermissions, SearchCollaborators
from .views import Filter

# All of these endpoints begin with 'api/v1/'
urlpatterns = [
    path('users/', UserList.as_view()),
    path('user/', LoggedInUserView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('user/update/', UpdateUser.as_view()),
    path('user/<int:pk>/delete/', DeleteUser.as_view()),
    path('user/picture/', UploadOrChangeProfilePicture.as_view()),
    path('user/email/', UpdateEmail.as_view()),
    path('user/preferences/', GetEmailPreferences.as_view()),
    path('user/preferences/update/', CreateOrUpdateEmailPreferences.as_view()),
    path('user/preferences/delete/', DeleteEmailPreferences.as_view()),

    path('projects/', ProjectList.as_view()),
    path('project/create/', CreateProject.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),
    path('project/<int:pk>/update/', UpdateProject.as_view()),
    path('project/<int:pk>/delete/', DeleteProject.as_view()),

    path('project/<int:pk>/collaborator/add/', AddCollaborator.as_view()),
    path('project/<int:pk>/collaborator/update/', UpdateCollaboratorPermissions.as_view()),
    path('project/<int:pk>/collaborator/delete/', DeleteCollaborator.as_view()),
    path('project/<int:pk>/collaborators/', GetProjectCollaborators.as_view()),
    path('project/<int:pk>/togglevisibility/', ToggleProjectVisibility.as_view()),
    path('project/<int:pk>/permissions/', LoggedInUserPermissions.as_view()),

    path('project/<int:pk>/file/', UploadFile.as_view()),
    path('project/<int:pk>/file/<int:filepk>/delete/', DeleteFile.as_view()),

    path('filter/', Filter.as_view()),
    path('collaboratorsearch/', SearchCollaborators.as_view())
]
