var locais = Array();
var individuos = Array();
var valorMin = 0; var valorMax = 1000;
var tamanhoCirc = 10;
var elem; var elemJquery;
var two;
var interacao = 0;

$(document).ready(function(){
    elem = document.getElementById('tela');
    elemJquery = $('#tela');
    params = { width: elemJquery.width(), height: elemJquery.height() };
    two = new Two(params).appendTo(elem);
});

function plotTela(objetivo) {
    $('#tela svg').remove() //LIMPANDO TELA
    two = new Two(params).appendTo(elem);
    locais.forEach(function(value) {
        // var x = (value.x * elemJquery.width()) / valorMax;
        // var y = (value.y * elemJquery.height()) / valorMax;
        var circle = two.makeCircle(value.x, value.y, tamanhoCirc);
        circle.fill = '#000000';
    });

    // Verificando se existe indivíduos para plotar o melhor caminho achado
    var dist = 0;
    var melhorResultado = '';
    if (individuos.length > 0) {
        individuos.forEach(function(indiv) {
            if (dist == 0 || indiv.distPbest < dist) {
                melhorResultado = indiv.pbest;
            }
        });
        if(melhorResultado != '') {
            for(i = 0; i < melhorResultado.length; i++) {
                if (i != melhorResultado.length - 1) {
                    var p1 = locais[melhorResultado[i]];
                    var p2 = locais[melhorResultado[i + 1]]
                    var line = two.makeLine(p1.x, p1.y, p2.x, p2.y);
                    line.fill = '#db1313';
                }
            }        
        }    
    }
    two.update();
}

function limparTela() {
    $('#tela svg').remove() //LIMPANDO TELA
    individuos = Array();   //Zerando array de individuos
    locais = Array();       //Zerando array de locais
}

function gerarPontosIniciais() {
    limparTela();
    var prob = $('#selectProb').val();
    var qtdLocais = $('#qtdLocais').val();
    locais = Array();
    
    if (prob != "") {
        var retornoPontos = calcMatrixDist(undefined, true, prob, elemJquery);
        retornoPontos.forEach(function(ponto) {
            locais.push(ponto);
        });
    } else {
        for(i=0; i <= qtdLocais - 1; i++) {
            var x1 = randomIntFromInterval(valorMin, valorMax);
            var y1 = randomIntFromInterval(valorMin, valorMax);
            var x = (x1 * elemJquery.width()) / valorMax;
            var y = (y1 * elemJquery.height()) / valorMax;
            var coord = {x,y};
            
            locais.push(coord);
        }

        //Enviando pontos iniciais para o backend
        calcMatrixDist(JSON.stringify(locais), false);
    }

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
    var numeroIteracoes = $('#qtdIteracao').val();
    var retornoAjax;
    if(individuos.length > 0) {
        retornoAjax = iterar(interacao, parseInt(numeroIteracoes));
    }
    individuos = []
    retornoAjax.forEach(function(indiv) {
        individuos.push(JSON.parse(indiv))
    });
    plotTela();
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function criaPontosClick() {
    gerarPontosIniciais();
}

function gerarProxIteracaoClick() {
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
