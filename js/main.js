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
                cicloFilm(films,cardTemplate);
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
                cicloSerie(series);
                var source = $('#card-template').html();
                var cardTemplate = Handlebars.compile(source);
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    });
    // $('.card').mouseenter(function(){
    //     $('.image-container').hide();
    //     $('.overlay').fadeIn();
    // });
});
function attivax(el,scelta){
    if (scelta) {
        el.find('.image-container').hide();
        el.find('.overlay').show();
    } else {
        el.find('.image-container').show();
        el.find('.overlay').hide();
    }

}
function cicloSerie(listaFilm) {
    for (var i = 0; i < listaFilm.length; i++) {
        var film = listaFilm[i];
        var votoInDecimi = film.vote_average;
        var posterPath = film.poster_path;
        var titoloIta = film.name;
        var titoloOriginale = film.original_name;
        var overview = film.overview;
        var dimensioneImmagine = 'w342';
        var urlImmagine = "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath;
        var voto2=votoStelle2(votoInDecimi);

        // creaBandiera();
        // function creaBandiera() {
        //     var miaBandiera = film.original_language;
        //     const parentElement = document.getElementById("bandiera");
        //     const flag = new CountryFlag(parentElement);
        //     flag.selectByTopLevelDomain(miaBandiera);
        //     if (miaBandiera == 'en') {
        //         flag.selectByTopLevelDomain('uk');
        //     }
        // }
    }
}

function cicloFilm(listaFilm,cardTemplate) {
    for (var i = 0; i < listaFilm.length; i++) {
        var obj={};
        var film = listaFilm[i];
        obj.titoloIta = film.title;
        obj.titoloOriginale = film.original_title;
        var posterPath = film.poster_path;
        var votoInDecimi = film.vote_average;
        obj.overview = film.overview;
        var dimensioneImmagine = 'w154';
        obj.urlImmagine = "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath;
        obj.voto2=votoStelle2(votoInDecimi);
        // creaBandiera();
        var html = cardTemplate(obj);
        $('.container-card').append(html);

        // function creaBandiera() {
        //     var miaBandiera = film.original_language;
        //     const parentElement = document.getElementById("bandiera");
        //     const flag = new CountryFlag(parentElement);
        //     flag.selectByTopLevelDomain(miaBandiera);
        //     if (miaBandiera == 'en') {
        //         flag.selectByTopLevelDomain('uk');
        //     }
        // }
        // function votoStelle(votoInDecimi) {
        //     var stelle = Math.ceil(votoInDecimi / 2);
        //     var stellePercentuale = ((stelle / 5) * 100);
        //     $('.stars-inner').css('width', stellePercentuale +'%')
        // }
    }
}

function votoStelle2(votoInDecimi) {
    var stelle = Math.ceil(votoInDecimi / 2);
    var stellePercentuale = ((stelle / 5) * 100);
    return stellePercentuale;
}
