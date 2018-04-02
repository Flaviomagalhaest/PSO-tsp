var locais = Array();
var valorMin = 0; var valorMax = 1000;
var tamanhoCirc = 10;
var elem; var elemJquery;
var two;

$(document).ready(function(){
    elem = document.getElementById('tela');
    elemJquery = $('#tela');
    params = { width: elemJquery.width(), height: elemJquery.height() };
    two = new Two(params).appendTo(elem);
});

function plotTela(objetivo) {
    two = new Two(params).appendTo(elem);
    locais.forEach(function(value) {
        var x = (value.x * elemJquery.width()) / valorMax;
        var y = (value.y * elemJquery.height()) / valorMax;
        var circle = two.makeCircle(x, y, tamanhoCirc);
        circle.fill = '#000000';
    });

    // if(objetivo !== undefined) { //SE PONTO OBJETIVO FOR PASSADO.
    //     var x = (objetivo.x * elemJquery.width()) / valorMax;
    //     var y = (objetivo.y * elemJquery.height()) / valorMax;
    //     var circle = two.makeCircle(x, y, tamanhoCirc + 5);
    //     circle.fill = '#e71c1c'; circle.stroke = '#e71c1c';
    // }

    two.update();
}

function limparTela() {
    $('#tela svg').remove() //LIMPANDO TELA
}

function gerarPontosIniciais() {
    var qtdLocais = $('#qtdLocais').val();
    locais = Array();
    
    for(i=0; i <= qtdLocais - 1; i++) {
        var x = randomIntFromInterval(valorMin, valorMax);
        var y = randomIntFromInterval(valorMin, valorMax);
        var coord = {x,y};
        
        locais.push(coord);
    }
    //Enviando pontos iniciais para o backend
    $.ajax({
        type: 'POST',
        url: '/PSO-tsp/calcMatrixDist/',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 
            pontos: JSON.stringify(locais)
        }),
        // success: function(response){
        //     console.log(response);
        // }
    });

    limparTela();
    plotTela();
}

function gerarIteracao() {

}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function criaPontosClick() {
    gerarPontosIniciais();
}

function gerarIteracaoClick() {
    gerarIteracao();
}

function limparTelaClick() {
    limparTela();
}

function infoIndivClick() {

}
