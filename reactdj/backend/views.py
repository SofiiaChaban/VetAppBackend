from django.shortcuts import render
from rest_framework import viewsets,generics

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import *
from .serializers import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET', 'POST', 'DELETE'])
def advertisments_list(request):
    if request.method == 'GET':
        advertisments = Advertisment.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            tutorials = advertisments.filter(title__icontains=title)

        advertisments_serializer = AdvertismentSerializer(advertisments, many=True)
        return JsonResponse(advertisments_serializer.data, safe=False)


@api_view(['POST', 'DELETE'])
def advertisment_add_delete(request):
    if request.method == 'POST':
        advertisment_data = JSONParser().parse(request)
        advertisment_seriaslizer = AdvertismentSerializer(data=advertisment_data)
        if advertisment_seriaslizer.is_valid():
            advertisment_seriaslizer.save()
            return JsonResponse(advertisment_seriaslizer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(advertisment_seriaslizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Advertisment.objects.all().delete()
    return JsonResponse({'message': '{} Advertisements were deleted successfully!'.format(count[0])},
                        status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def advertisments_detail(request, pk):
    # find tutorial by pk (id)
    try:
        advertisment = Advertisment.objects.get(pk=pk)
    except Advertisment.DoesNotExist:
        return JsonResponse({'message': 'The advertisment does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        advertisment_serializer = AdvertismentSerializer(advertisment)
        return JsonResponse(advertisment_serializer.data)

    elif request.method == 'PUT':
        advertisment_data = JSONParser().parse(request)
        advertisment_serializer = AdvertismentSerializer(advertisment, data=advertisment_data)
        if advertisment_serializer.is_valid():
            advertisment_serializer.save()
            return JsonResponse(advertisment_serializer.data)
        return JsonResponse(advertisment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        advertisment.delete()
        return JsonResponse({'message': 'Advertisement was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


class AdvertisementByTitle(generics.ListAPIView):
    model = Advertisment
    serializer_class = AdvertismentSerializer

    def get_queryset(self):
        title = self.kwargs['title']
        queryset = self.model.objects.filter(title__icontains=title)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


@api_view(['GET', 'POST', 'DELETE'])
def pet_list(request):
    if request.method == 'GET':
        pets = Pet.objects.all()

        pets_serializer = PetSerializer(pets, many=True)
        return JsonResponse(pets_serializer.data, safe=False)
    elif request.method == 'POST':
        pet_data = JSONParser().parse(request)
        pet_serializer = PetSerializer(data=pet_data)
        if pet_serializer.is_valid():
            pet_serializer.save()
            return JsonResponse(pet_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(pet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Pet.objects.all().delete()
    return JsonResponse({'message': '{} Pets were deleted successfully!'.format(count[0])},
                        status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def pet_detail(request, pk):
    # find tutorial by pk (id)
    try:
        pet = Pet.objects.get(pk=pk)
    except Pet.DoesNotExist:
        return JsonResponse({'message': 'The pet does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        pet_serializer = PetSerializer(pet)
        return JsonResponse(pet_serializer.data)

    elif request.method == 'PUT':
        pet_data = JSONParser().parse(request)
        pet_serializer = PetSerializer(pet, data=pet_data)
        if pet_serializer.is_valid():
            pet_serializer.save()
            return JsonResponse(pet_serializer.data)
        return JsonResponse(pet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pet.delete()
        return JsonResponse({'message': 'Pet was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)