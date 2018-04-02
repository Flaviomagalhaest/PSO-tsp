from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('calcMatrixDist/', views.calcMatrixDist, name='calcMatrixDist'),
    path('teste/', views.teste, name='teste')
]