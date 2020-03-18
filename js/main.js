$(document).ready(function (){
    $('.searchbar-button').click(function() {
        var nomeInserito = $('#searchbar').val();
        // console.log(nomeInserito);
        var apiBaseUrl = 'https://api.themoviedb.org/3';
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
                cicloFilm(films);

                    function cicloFilm(listaFilm) {
                        for (var i = 0; i < films.length; i++) {
                            var film = listaFilm[i];
                            console.log(film.title);
                            console.log(film.original_title);
                            console.log(film.original_language);
                            console.log(film.vote_average);
                            var votoInDecimi = film.vote_average;
                            votoStelle(votoInDecimi);
                    }
                    function votoStelle(votoInDecimi) {
                        var stelle = Math.ceil(votoInDecimi / 2);
                        console.log(stelle);
                        var stellePercentuale = ((stelle / 5) * 100);
                        console.log(stellePercentuale);
                        $('.stars-inner').css('width', stellePercentuale +'%')
                    }
                }
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

                    function cicloSerie(listaFilm) {
                        for (var i = 0; i < listaFilm.length; i++) {
                            var film = listaFilm[i];
                            console.log(film.name);
                            console.log(film.original_name);
                            console.log(film.original_language);
                            console.log(film.vote_average);
                            var votoInDecimi = film.vote_average;
                            votoStelle(votoInDecimi);
                    }
                    function votoStelle(votoInDecimi) {
                        var stelle = Math.ceil(votoInDecimi / 2);
                        console.log(stelle);
                        var stellePercentuale = ((stelle / 5) * 100);
                        console.log(stellePercentuale);
                        $('.stars-inner').css('width', stellePercentuale +'%')
                    }
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });

    });
});
