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
    <div class="accordion-section"> \
    <a class="accordion-section-title" href="#accordion-1">Accordion Section #1</a> \
    <div id="accordion-1" class="accordion-section-content"> \
    <p>Mauris interdum fringilla augue vitae tincidunt. Curabitur vitae tortor id eros euismod ultrices. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent nulla mi, rutrum ut feugiat at, vestibulum ut neque? Cras tincidunt enim vel aliquet facilisis. Duis congue ullamcorper vehicula. Proin nunc lacus, semper sit amet elit sit amet, aliquet pulvinar erat. Nunc pretium quis sapien eu rhoncus. Suspendisse ornare gravida mi, et placerat tellus tempor vitae.</p> \
    </div><!--end .accordion-section-content--> \
    </div><!--end .accordion-section--> \
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
