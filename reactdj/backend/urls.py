from django.conf.urls import url
from backend import views
from django.urls import path,include



urlpatterns = [
    path('backend/advertisments', views.advertisments_list),
    path('backend/advertisments/add', views.advertisment_add_delete),
    path('backend/advertisments/<pk>', views.advertisments_detail),
    path('backend/advertisment/<title>',views.AdvertisementByTitle.as_view()),
    path('users/', views.UserViewSet.as_view({'get': 'list'})),
    path('backend/pets/', views.pet_list),
    path('backend/pets/<pk>',views.pet_detail),


]