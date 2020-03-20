$(document).ready(function (){
    var apiBaseUrl = 'https://api.themoviedb.org/3';
    $('.searchbar-button').click(function() {
        var nomeInserito = $('#searchbar').val();


// CHIAMATA ALL'API PER I FILM
        $.ajax({
            url: apiBaseUrl + '/search/movie',
            // url: apiBaseUrl + '/search/tv',
            data: {
                api_key: '6d0fd5c96501c78452d6d55bbbef0583',
                query: nomeInserito,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data){
                console.log(data);
                var films = data.results;
                var source = $('#card-template').html();
                var cardTemplate = Handlebars.compile(source);
                cicloFilm(films, cardTemplate);
            },
            error: function (err) {
                alert('BOOM');
            }
        });
// CHIAMATA ALL'API PER LE SERIE TV
        $.ajax({
            url: apiBaseUrl + '/search/tv',
            data: {
                api_key: '6d0fd5c96501c78452d6d55bbbef0583',
                query: nomeInserito,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data){
                console.log(data);
                var series = data.results;
                var source = $('#card-template').html();
                var cardTemplate = Handlebars.compile(source);
                cicloSerie(series, cardTemplate);
            },
            error: function (err) {
                alert('BOOM');
            }
        });
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
function cicloSerie(listaFilm, cardTemplate) {
    for (var i = 0; i < listaFilm.length; i++) {
        var film = listaFilm[i];
        var votoInDecimi = film.vote_average;
        var posterPath = film.poster_path;
        var dimensioneImmagine = 'w342';
        var obj = {
            titoloIta: film.name,
            titoloOriginale: film.original_name,
            overview: film.overview,
            urlImmagine: "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath,
            voto2: votoStelle2(votoInDecimi),
            bandiera: creaBandiera(film)
        };
        var html = cardTemplate(obj);
        $('.container-card').append(html);
    }
}

function cicloFilm(listaFilm,cardTemplate) {
    for (var i = 0; i < listaFilm.length; i++) {
        var film = listaFilm[i];
        var posterPath = film.poster_path;
        var dimensioneImmagine = 'w154';
        var votoInDecimi = film.vote_average;
        var obj = {
            titoloIta: film.title,
            titoloOriginale: film.original_title,
            overview: film.overview,
            urlImmagine: "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath,
            voto2: votoStelle2(votoInDecimi),
            bandiera: creaBandiera(film)
        };
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
        var miaBandiera = 'uk';
    }
    return miaBandiera;
}
