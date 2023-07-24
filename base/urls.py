from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('products/',views.getProducts, name="products"),
    path('products/<int:pk>',views.getProduct, name="product"),
    path('products/delete/<int:pk>',views.deleteProduct, name="product_delete"),
    path('products/create/',views.createProduct, name="product_create"),
    path('products/upload/',views.uploadImage, name="image_upload"),
    path('products/<int:pk>/reviews/',views.createProductReview, name="create_review"),

    path('products/update/<int:pk>',views.updateProduct, name="product_update"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfile, name="user_profile"),
    path('users/profile/update/',views.updateUserProfile, name="user_profile_update"),
    path('users/<str:pk>/',views.getUserById, name="user"),
    path('users/update/<str:pk>/',views.updateUser, name="userUpdate"),
    path('users/delete/<str:pk>/',views.deleteUser, name="userDelete"),
    path('users/',views.getUsers, name="users"),
    path('users/register/', views.registerUser, name='register')
]