#Concentrarei métodos de auxílio a view. Como upload de txt, gravações em sessão e etc.

def lerArquivoDePontos(nomeDoArquivo, width, height):
    f = open("PSO-tsp/static/PSO-tsp/file/" + nomeDoArquivo, "r")
    margemMax = 10  #Tamanho de margem para plotar pontos na tela
    margemMin = 2  #Tamanho de margem para plotar pontos na tela
    width = width - margemMax
    height = height - margemMax
    pontosJson = []
    for line in f:
        split = line.strip().split()
        pontosJson.append({'x': float(split[1]) + margemMin, 'y' : float(split[2]) + margemMin})
    #Fazendo composição para a resolução da tela
    maiorX = max([ponto['x'] for ponto in pontosJson])
    maiorY = max([ponto['y'] for ponto in pontosJson])
    for ponto in pontosJson:
        ponto['x'] = (ponto['x'] * width) / maiorX
        ponto['y'] = (ponto['y'] * height) / maiorY
    return pontosJson
    