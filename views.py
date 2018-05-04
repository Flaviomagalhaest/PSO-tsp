from django.shortcuts import render
from django.template import loader
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from py.tsp import tspController as tspController
import json, os

def index(request):
    template = loader.get_template('PSO-tsp/index.html')
    #Lê arquivos txt de problemas padrão que se encontram na pasta
    arquivos = os.listdir('psoweb/PSO-tsp/static/PSO-tsp/file')
    context = { 'arquivos' : arquivos }
    return render(request,'PSO-tsp/index.html',context)

@csrf_exempt
def calcMatrixDist(request):
    jsonAjax = request.body
    data = json.loads(jsonAjax)     #Pontos iniciais vindo do frontend.
    
    if data['usarArquivo'] == True: #Os pontos serão importados pelo arquivo txt.
        f = open("psoweb/PSO-tsp/static/PSO-tsp/file/" + data["nomeDoArquivo"], "r")
        pontosJson = []
        for line in f:
            split = line.strip().split()

            pontosJson.append({'x': split[1], 'y' : split[2]})
        a = 1
    else:   #Os pontos serão usados pelos que foram passados pelo front
        pontosJson = json.loads(data['pontos']) #Transformando em json.

    pontosObj = tspController.calcMatrixDist(pontosJson)    #Chamando controller que instanciará objeto de pontos e calculará matriz distância.
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
def geraIteracao(request):
    jsonAjax = json.loads(request.body) #Recebendo numero de iteracao atual e a quantidade a calcular
    iteracaoAtual = jsonAjax['iteracaoAtual']
    nrIteracoes = jsonAjax['nrIteracoes']
    individuosJson = request.session['individuos']  #Buscando individuos na sessao
    pontosSessao = request.session['pontos']        #Buscando pontos na sessao
    #Gerando iteracoes e atualizando individuos
    individuos = tspController.geraIteracao(iteracaoAtual, nrIteracoes, individuosJson, pontosSessao)
    individuosJson = [i.toJson() for i in individuos]   #Criando lista de individuo em formato serializável em json
    request.session['individuos'] = individuosJson    #Salvando individuos em sessão
    return JsonResponse(individuosJson, safe=False)


@csrf_exempt
def teste(request):
    context = { }
    return render(request,'PSO-tsp/index.html',context)


