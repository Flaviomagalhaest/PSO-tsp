from django.shortcuts import render
from django.template import loader
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from py.tsp import PontosClass as P
import json

def index(request):
    template = loader.get_template('PSO-tsp/index.html')
    context = { }
    request.session['teste'] = 1
    return render(request,'PSO-tsp/index.html',context)

@csrf_exempt
def calcMatrixDist(request):
    jsonAjax = request.body
    data = json.loads(jsonAjax)     #Pontos iniciais vindo do frontend
    pontosJson = json.loads(data['pontos']) #Transformando em json

    pontosObj = P.Pontos(pontosJson)    #Instanciando classe de Pontos. Passando lista json
    pontosObj.calcMatrixDist()      #Calculando para cada ponto em Pontos, sua matriz distância.

    print(pontosObj.pontos[0].matrixDist)
    response = HttpResponse("Pontos iniciais recebidos com sucesso!")
    return response

@csrf_exempt
def teste(request):
    # jsonAjax = request.body
    # data = json.loads(jsonAjax)
    request.session['teste'] = request.session['teste'] + 1
    context = { }
    return render(request,'PSO-tsp/index.html',context)


