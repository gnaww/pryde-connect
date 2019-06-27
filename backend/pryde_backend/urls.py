"""pryde_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

API_TITLE = 'PRYDE API'
API_DESCRIPTION = 'A web API for PRYDE Connector'
schema_view = get_swagger_view(title=API_TITLE)
urlpatterns = [
    path('admin/', admin.site.urls),


    # include the urls defined in the app's (api) url file
    path('api/v1/', include('api.urls')),


    url(r'^api/v1/rest-auth/', include('rest_auth.urls')),
    url(r'^api/v1/rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^swagger-docs/', schema_view),
    path('docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
]
