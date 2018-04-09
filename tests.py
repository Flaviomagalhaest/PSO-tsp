from django.test import TestCase
from py.tsp import PontosClass as P
from py.tsp import tspController as tspController
import os


class PSOTspTestCase(TestCase):
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "psoweb.settings")

    pontosJson = [{'x': 4, 'y': 0}, {'x': 2, 'y': 2}, {'x': 1, 'y': 1}]
    pontosObj = tspController.calcMatrixDist(pontosJson)    

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
        individuos = tspController.geraPopInicial(2, 3, self.pontosObj)
        self.assertEqual(len(individuos), 2)

