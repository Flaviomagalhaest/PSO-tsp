from django.test import TestCase
from py.tsp import PontosClass as P
from py.tsp import tspController as tspController
from py.tsp import IndividuoClass as I
import os, json


class PSOTspTestCase(TestCase):
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "psoweb.settings")

    #Criando pontos para testes
    pontosJsonString = '[{"x": 4, "y": 0}, {"x": 2, "y": 2}, {"x": 1, "y": 1}]'
    pontosJson = [{'x': 4, 'y': 0}, {'x': 2, 'y': 2}, {'x': 1, 'y': 1}]
    pontosObj = tspController.calcMatrixDist(pontosJson)    

    #Criando individuos para testes
    indivJson = []
    indivJson.append('{"atual": [5, 4, 0, 3, 9, 6, 7, 8, 2, 1, 5], "pbest": [], "distAtual": 4415.696909091138, "distPbest": 0, "gbest": false}')
    indivJson.append('{"atual": [1, 4, 9, 2, 5, 3, 8, 7, 6, 0, 1], "pbest": [], "distAtual": 4006.7252376388124, "distPbest": 0, "gbest": false}')
    indivJson.append('{"atual": [6, 3, 7, 4, 8, 1, 2, 0, 5, 9, 6], "pbest": [], "distAtual": 4472.919868660942, "distPbest": 0, "gbest": false}')
    individuos = []
    for indiv in indivJson:
        individuos.append(I.Individuo(json=json.loads(indiv)))    
    
    def test_geraMatrizDistanciaCorretamente(self):    
        self.assertEqual(self.pontosObj.pontos[0].matrixDist,[0.0, 2.8284271247461903, 3.1622776601683795])
        self.assertEqual(self.pontosObj.pontos[1].matrixDist,[2.8284271247461903, 0.0, 1.4142135623730951])
        self.assertEqual(self.pontosObj.pontos[2].matrixDist,[3.1622776601683795, 1.4142135623730951, 0.0])

    def test_geraJsonCorretamente(self):
        self.assertEqual(self.pontosObj.toJson(),
            '[{"x": 4, "y": 0, "matrix": [0.0, 2.8284271247461903, 3.1622776601683795]}, '+
            '{"x": 2, "y": 2, "matrix": [2.8284271247461903, 0.0, 1.4142135623730951]}, '+
            '{"x": 1, "y": 1, "matrix": [3.1622776601683795, 1.4142135623730951, 0.0]}]'
        )

    def test_geraDistTotalDeCaminhoCorretamente(self):
        dist = self.pontosObj.calcDistDeCaminhos([2,1,0])
        self.assertEqual(dist, 7.404918347287666)

    def test_geraObjetoPontosAPartirDeJson(self):
        teste = '[{"x": 4, "y": 0, "matrix": [0.0, 2.8284271247461903, 3.1622776601683795]},{"x": 2, "y": 2, "matrix": [2.8284271247461903, 0.0, 1.4142135623730951]},{"x": 1, "y": 1, "matrix": [3.1622776601683795, 1.4142135623730951, 0.0]}]'
        pontos = P.Pontos(jsonSessao = teste)
        self.assertEqual(pontos.pontos[0].x, 4)
        self.assertEqual(pontos.pontos[1].x, 2)
        self.assertEqual(pontos.pontos[2].x, 1)

    def test_geraCorretamentePopInicial(self):
        individuos = tspController.geraPopInicial(2, 3, self.pontosObj.toJson())
        self.assertEqual(len(individuos), 2)

    def test_defineGbest(self):
        gbest = tspController.atualizaGbest(self.individuos)
        self.assertEqual(gbest.toJson(), '{"atual": [1, 4, 9, 2, 5, 3, 8, 7, 6, 0, 1], "pbest": [], "distAtual": 4006.7252376388124, "distPbest": 0, "gbest": true}')
        self.assertEqual(self.individuos[1].gbest, True)
    
    def test_definePbests(self):
        individuos = tspController.atualizaPbest(self.individuos)
        self.assertEqual(individuos[0].atual, individuos[0].pbest)
        self.assertEqual(individuos[1].atual, individuos[1].pbest)
        self.assertEqual(individuos[2].atual, individuos[2].pbest)
