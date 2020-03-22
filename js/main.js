$(document).ready(function (){
    $('.searchbar-button').click(function() {
        $('.container-card').empty(); //serve a svuotare il container delel card
        var nomeInserito = $('#searchbar').val();
        $('#searchbar').empty();
    filmTv("movie");
    filmTv("tv");
    });
});

function attivaOverlay(questoElemento, scelta){
    if (scelta) {
        questoElemento.find('.image-container').hide();
        questoElemento.find('.overlay').show();
    } else {
        questoElemento.find('.image-container').show();
        questoElemento.find('.overlay').hide();
    }

}

function cicloGenerico(listaFilm, cardTemplate, tipo) {
    for (var i = 0; i < listaFilm.length; i++) {
        var film = listaFilm[i];
        var posterPath = film.poster_path;
        var dimensioneImmagine = 'w154';
        var votoInDecimi = film.vote_average;
        var obj = {
            titoloIta:"",
            titoloOriginale:"",
            overview: film.overview,
            urlImmagine: "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath,
            voto2: votoStelle2(votoInDecimi),
            bandiera: creaBandiera(film)
        };
        if (posterPath == 'null' || posterPath == null) {
            obj.urlImmagine = "no-image.jpg";
        }
        if(tipo == "tv") {
            obj.titoloIta = film.title;
            obj.titoloOriginale = film.original_title;
        }else {
            obj.titoloIta = film.title;
            obj.titoloOriginale = film.original_title;
        }
        var html = cardTemplate(obj);
        $('.container-card').append(html);
    }
}

function votoStelle2(votoInDecimi) {
    var stellePercentuale = (votoInDecimi * 10);
    return stellePercentuale;
}

function creaBandiera(film) {
    var miaBandiera = film.original_language;
    if (miaBandiera == 'en') {
        var miaBandiera = 'gb';
    }
    return miaBandiera;
}

function filmTv(tipo){
    var source = $('#card-template').html();
    var cardTemplate = Handlebars.compile(source);
    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var nomeInserito = $('#searchbar').val();
    $.ajax({
        url: apiBaseUrl + '/search/' + tipo,
        data: {
            api_key: '6d0fd5c96501c78452d6d55bbbef0583',
            query: nomeInserito,
            language: 'it-IT'
        },
        method: 'GET',
        success: function(data){
            // console.log(data);
            var lista = data.results;
            cicloGenerico(lista, cardTemplate,tipo);
        },
        error: function (err) {
            alert('BOOM');
        }
    });
}
