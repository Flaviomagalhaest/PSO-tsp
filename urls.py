from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('calcMatrixDist/', views.calcMatrixDist, name='calcMatrixDist'),
    path('geraPopInicial/', views.geraPopInicial, name='geraPopInicial'),
    path('teste/', views.teste, name='teste')
]