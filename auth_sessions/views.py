from django.contrib import auth
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from .serializers import UserSerializer


class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                serializer = UserSerializer(user)
                return Response({"success": serializer.data})
            else:
                return Response({"error": "User is not authenticated"})
        except:
            return Response(
                {"error": "Something went wrong when checking authentication status"}
            )


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({"success": "CSRF cookie set"})


# @method_decorator(csrf_protect, name="dispatch")
# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         data = self.request.data

#         username = data["username"]
#         password = data["password"]

#         try:
#             user = auth.authenticate(username=username, password=password)

#             if user is not None:
#                 auth.login(request, user)
#                 serializer = UserSerializer(user)
#                 return Response({"success": serializer.data})
#             else:
#                 return Response({"error": "Invalid username or password"})
#         except:
#             return Response({"error": "Something went wrong when logging in"})

# Because we handle logging out with next js api, we dont need this logout view
# but will keep just in case we want to implement it in the future
# class LogoutView(APIView):
#     def post(self, request, format=None):
#         try:
#             auth.logout(request)
#             return Response({"success": "Logged Out"})
#         except:
#             return Response({"error": "Something went wrong when logging out"})


class LoadUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        try:
            user = request.user
            user = UserSerializer(user)

            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to load user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )