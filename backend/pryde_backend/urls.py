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
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from .views import null_view

from django.conf import settings
from django.conf.urls.static import static


API_TITLE = 'PRYDE Connect API'
API_DESCRIPTION = 'A web API for PRYDE Connect'
urlpatterns = [
    path('admin/', admin.site.urls),

    url(r'^', include('django.contrib.auth.urls')),
    # include the urls defined in the app's (api) url file
    path('v1/', include('api.urls')),

    # hacky workaround to have custom email templates for email verification/confirmation
    # pulled from https://github.com/Tivix/django-rest-auth/issues/292
    url(r'^rest-auth/registration/account-email-verification-sent/', null_view, name='account_email_verification_sent'),
    url(r'^rest-auth/registration/account-confirm-email/', null_view, name='account_confirm_email'),

    url(r'^v1/rest-auth/', include('rest_auth.urls')),
    url(r'^v1/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
]

urlpatterns += static('/media/',document_root=settings.MEDIA_ROOT)
