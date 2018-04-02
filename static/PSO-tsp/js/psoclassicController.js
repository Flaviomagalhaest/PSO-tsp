var indiv = Array();
var objetivo;
var valorMin = 0; var valorMax = 1000;
var tamanhoCirc = 5;
var elem; var elemJquery; var params;
var two;

$(document).ready(function(){
    elem = document.getElementById('tela');
    elemJquery = $('#tela');
    params = { width: elemJquery.width(), height: elemJquery.height() };
    two = new Two(params).appendTo(elem);
});

//ENVIANDO PONTOS PARA O BACK E RECEBENDO DE VOLTA
//COM AS COORDENADAS CALCULADAS
function calcular() {
    var c1 = $('#c1').val();
    var c2 = $('#c2').val();
    var constantes = {c1,c2};
    $.ajax({
        type: 'POST',
        url: '/PSO-classic/calculapso/',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 
            indiv: JSON.stringify(indiv),
            objetivo: JSON.stringify(objetivo),
            constantes: JSON.stringify(constantes),
        }),
        success: function(response){
            console.log(response);
            //Atualizando lista de indivs
            indiv = response.slice()
            limparTela();
            plotTela(objetivo)
        }
    });
}

function gerarPopInicial() {
    var qtdIndiv = $('#qtdIndividuos').val();
    indiv = Array();
    
    for(i=0; i <= qtdIndiv - 1; i++) {
        var x = randomIntFromInterval(valorMin, valorMax);
        var y = randomIntFromInterval(valorMin, valorMax);
        var coord = {x,y};
        
        indiv.push(coord);
    }
    limparTela();
    plotTela();
}

//PLOTANDO PONTOS NA TELA
//ESTA SENDO CRIADO UMA INSTANCIA DO TWO A CADA REQUISIÇÃO DE PLOT NA TELA.
//MAIS TARDE PROCURAREI UMA ALTERNATIVA.
function plotTela(objetivo) {
    two = new Two(params).appendTo(elem);
    indiv.forEach(function(value) {
        var x = (value.x * elemJquery.width()) / valorMax;
        var y = (value.y * elemJquery.height()) / valorMax;
        var circle = two.makeCircle(x, y, tamanhoCirc);
        circle.fill = '#000000';
    });

    if(objetivo !== undefined) { //SE PONTO OBJETIVO FOR PASSADO.
        var x = (objetivo.x * elemJquery.width()) / valorMax;
        var y = (objetivo.y * elemJquery.height()) / valorMax;
        var circle = two.makeCircle(x, y, tamanhoCirc + 5);
        circle.fill = '#e71c1c'; circle.stroke = '#e71c1c';
    }

    two.update();
}

function criaObjetivo() {
    var x = randomIntFromInterval(valorMin, valorMax);
    var y = randomIntFromInterval(valorMin, valorMax);
    objetivo = {x,y};
    limparTela();
    plotTela(objetivo);
}

function limparTela() {
    $('#tela svg').remove() //LIMPANDO TELA
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function gerarPopClick() {
    gerarPopInicial();
}

function criaObjetivoClick() {
    criaObjetivo();
}

function limparTelaClick() {
    limparTela();
}

function calcularClick() {
    calcular();
}