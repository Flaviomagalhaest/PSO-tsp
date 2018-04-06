//Concentrarei aqui todas as requisições ajax    


function calcMatrixDist(locais) {
    //Enviando pontos iniciais para o backend
    $.ajax({
        type: 'POST',
        url: '/PSO-tsp/calcMatrixDist/',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 
            pontos: locais
        }),
    });
}

function geraPopInicial() {
    //Envia para o back requisição de população inicial
    //Recebe Individuos criados
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
}
