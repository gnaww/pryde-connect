from django.urls import path, include
from django.conf.urls import url


from .views import hello_world

# all of these endpoints begin with 'api/v1/'
urlpatterns = [

    path('hello/', hello_world),

]