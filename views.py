from django.shortcuts import render
from django.template import loader
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from py.tsp import tspController as tspController
import json

def index(request):
    template = loader.get_template('PSO-tsp/index.html')
    context = { }
    return render(request,'PSO-tsp/index.html',context)

@csrf_exempt
def calcMatrixDist(request):
    jsonAjax = request.body
    data = json.loads(jsonAjax)     #Pontos iniciais vindo do frontend.
    pontosJson = json.loads(data['pontos']) #Transformando em json.

    #Chamando controller que instanciará objeto de pontos e calculará matriz distância.
    pontosObj = tspController.calcMatrixDist(pontosJson)

    #Salvando informações de pontos em formato JSON em sessão.
    request.session['pontos'] = pontosObj.toJson()
    request.session['qtdPontos'] = len(pontosObj.pontos)

    return HttpResponse("Pontos iniciais recebidos com sucesso!")

@csrf_exempt
def geraPopInicial(request):
    jsonAjax = json.loads(request.body) #Recebendo quantidade de indivíduos a criar.
    
    qtdIndiv = json.loads(jsonAjax['individuos'])
    qtdPontos = request.session['qtdPontos']
    pontosSessao = request.session['pontos']
    #Gerando individuos iniciais
    individuos = tspController.geraPopInicial(qtdIndiv, qtdPontos, pontosSessao)
    individuosJson = [i.toJson() for i in individuos]   #Criando lista de individuo em formato serializável em json
    request.session['individuos'] = individuosJson    #Salvando individuos em sessão
    return JsonResponse(individuosJson, safe=False)

@csrf_exempt
def teste(request):
    context = { }
    return render(request,'PSO-tsp/index.html',context)


