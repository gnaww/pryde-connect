from django.urls import path, include
from django.conf.urls import url


from .views import hello_world, StudyList, StudyCreate

# all of these endpoints begin with 'api/v1/'
urlpatterns = [

    path('hello/', hello_world),

    path('study/', StudyList.as_view()),

    path('study/create/', StudyCreate.as_view()),


]