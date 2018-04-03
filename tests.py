from django.test import TestCase
from py.tsp import PontosClass as P


class PSOTspTestCase(TestCase):
    def test_geraMatrizDistanciaCorretamenteEJson(self):    
        pontosJson = [{'x': 409, 'y': 728}, {'x': 697, 'y': 828}]
        pontosObj = P.Pontos(pontosJson)   
        pontosObj.calcMatrixDist()
        self.assertEqual(pontosObj.pontos[0].matrixDist,[0.0, 304.86718419665965])
        self.assertEqual(pontosObj.pontos[1].matrixDist,[304.86718419665965, 0.0])
        self.assertEqual(pontosObj.toJson(),
            '[{"x": 409, "y": 728, "matrix": [0.0, 304.86718419665965]}, {"x": 697, "y": 828, "matrix": [304.86718419665965, 0.0]}]'
        )