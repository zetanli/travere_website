from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product,Review
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        #data['username'] = self.user.username
        #data['email'] = self.user.email
        return data
    
class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','first_name','last_name','isAdmin']
    def get__id(self,obj):
        return obj.id
    def get_isAdmin(self,obj):
        return obj.is_staff
    
class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','first_name','last_name','isAdmin','token']
    def get__id(self,obj):
        return obj.id
    def get_isAdmin(self,obj):
        return obj.is_staff
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)