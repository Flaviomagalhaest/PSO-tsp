from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('calcMatrixDist/', views.calcMatrixDist, name='calcMatrixDist'),
    path('geraPopInicial/', views.geraPopInicial, name='geraPopInicial'),
    path('geraIteracao/', views.geraIteracao, name='geraIteracao'),
    path('teste/', views.teste, name='teste')
]