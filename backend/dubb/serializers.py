from xml.dom import ValidationErr

from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'

	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(
			username=clean_data['username'], email=clean_data['email'], password=clean_data['password'])
		user_obj.save()
		return user_obj


class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##

	def check_user(self, clean_data):
		user = authenticate(
			email=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationErr('user not found')
		return user


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
