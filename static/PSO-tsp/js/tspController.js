var locais = Array();
var valorMin = 0; var valorMax = 1000;
var tamanhoCirc = 10;
var elem; var elemJquery;
var two;
var individuos = Array();

$(document).ready(function(){
    elem = document.getElementById('tela');
    elemJquery = $('#tela');
    params = { width: elemJquery.width(), height: elemJquery.height() };
    two = new Two(params).appendTo(elem);
    
    $('.accordion-section-title').click(function(e) {
        var a = 1;
    });
});

function plotTela(objetivo) {
    two = new Two(params).appendTo(elem);
    locais.forEach(function(value) {
        var x = (value.x * elemJquery.width()) / valorMax;
        var y = (value.y * elemJquery.height()) / valorMax;
        var circle = two.makeCircle(x, y, tamanhoCirc);
        circle.fill = '#000000';
    });
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
    calcMatrixDist(JSON.stringify(locais));

    limparTela();
    plotTela();
}

function gerarIndivIniciais() {
    var qtdIndiv = $('#qtdIndiv').val();
    individuos = Array();
    var retornoAjax;
    if(qtdIndiv > 0) {
        retornoAjax = geraPopInicial(qtdIndiv);
    }
    retornoAjax.forEach(function(indiv) {
        individuos.push(JSON.parse(indiv))
    });
}

function infoIndiv() {
    $.tinyModal({
        title: 'Hello World!',
        html: '#mymodal'
      });
}

function montaModalComIndividuos() {
    html = '<div class="accordion"> \
    <div class="accordion-section">' ;
    var count = 0;
    individuos.forEach(function(e){
        var classe = 'accordion-section-title';
        if(e.gbest) {
            classe += ' gbest';
        } else if (e.distAtual < e.distPbest) {
            classe += ' melhora';   //Adicionando classe nova para indivíduos que melhoraram seu pbest
        }
        html += '<a class="'+classe+'" href="#accordion-'+count+'">Individuo #'+count+'</a> \
        <div id="accordion-'+count+'" class="accordion-section-content"> \
        <p>Caminho atual : ['+e.atual.toString()+']</p> \
        <p>Distância atual : '+e.distAtual.toString()+'</p> \
        <p>Caminho pBest : ['+e.pbest.toString()+']</p> \
        <p>Distância pBest : '+e.distPbest.toString()+'</p> \
        </div><!--end .accordion-section-content-->';
        count++;
    });
    html += '</div><!--end .accordion-section--> \
    </div><!--end .accordion--> \
    '
    return html;
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
    infoIndiv();
}

function criaIndivClick() {
    gerarIndivIniciais();   
}
