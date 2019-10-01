from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# hacky workaround to have custom email templates for email verification/confirmation
@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)
