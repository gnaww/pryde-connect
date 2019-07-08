from django.urls import path, include
from django.conf.urls import url


from .views import hello_world, ProjectList, ProjectCreate, ProjectView, UserView, ProjectViewOne, SingleUser

# all of these endpoints begin with 'api/v1/'
urlpatterns = [

    path('hello/', hello_world),

    path('project/', ProjectList.as_view()),

    path('project/create/', ProjectCreate.as_view()),
    path('project/<int:pk>/', ProjectView.as_view()),
    path('user/<int:pk>/', SingleUser.as_view()),

    path('project/user/<int:pk>/', ProjectViewOne.as_view()),



]