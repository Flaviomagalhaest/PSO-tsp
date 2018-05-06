//Concentrarei aqui todas as requisições ajax    


function calcMatrixDist(locais, usarArquivo, nomeDoArquivo, elemJquery) {
    var retorno = '';
    if (usarArquivo == true) { //Foi escolhido gerar pontos por arquivo txt
        $.ajax({
            type: 'POST',
            url: '/PSO-tsp/calcMatrixDist/',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ 
                usarArquivo: usarArquivo,
                nomeDoArquivo: nomeDoArquivo,
                width: elemJquery.width(),
                height: elemJquery.height()
            }),
            success: function(response){
                retorno = response;
            }
        });        
    } else { //Se lista de pontos, Foi escolhido gerar os pontos por random na tela.
        //Enviando pontos iniciais para o backend
        $.ajax({
            type: 'POST',
            url: '/PSO-tsp/calcMatrixDist/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ 
                usarArquivo: usarArquivo,
                pontos: locais
            }),
        });
    }
    return JSON.parse(retorno)
}

function geraPopInicial(qtdIndiv) {
    //Envia para o back requisição de população inicial
    //Recebe Individuos criados
    var retorno
    $.ajax({
        type: 'POST',
        url: '/PSO-tsp/geraPopInicial/',
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 
            individuos: qtdIndiv
        }),
        success: function(response){
            retorno = response;
        }
    });    
    return retorno;  
}

function iterar(nrIteracaoAtual, nrDeIteracoes) {
    //Envia numero atual de iteracao e o número de iterações a mais para computar
    var retorno
    $.ajax({
        type: 'POST',
        url: '/PSO-tsp/geraIteracao/',
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 
            iteracaoAtual: nrIteracaoAtual,
            nrIteracoes: nrDeIteracoes,
        }),
        success: function(response){
            retorno = response;
        }
    });    
    return retorno;  
}