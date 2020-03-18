$(document).ready(function (){

    // const parentElement = document.getElementById("bandiera");
    // const flag = new CountryFlag(parentElement);
    // miaBandiera = 'it';
    // flag.selectByTopLevelDomain(miaBandiera);

    $('.card').mouseenter(function(){
        $('.image-container').hide();
        $('.overlay').fadeIn();

    });
    $('.searchbar-button').click(function() {
        var nomeInserito = $('#searchbar').val();
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
                            console.log(film.poster_path);
                            var titoloIta = film.title;
                            var titoloOriginale = film.original_title;
                            var posterPath = film.poster_path;
                            var votoInDecimi = film.vote_average;
                            var dimensioneImmagine = 'w154';
                            var urlImmagine = "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath;
                            console.log(urlImmagine);
                            votoStelle(votoInDecimi);
                            creaBandiera();
                            function creaBandiera() {
                                var miaBandiera = film.original_language;
                                const parentElement = document.getElementById("bandiera");
                                const flag = new CountryFlag(parentElement);
                                flag.selectByTopLevelDomain(miaBandiera);
                                if (miaBandiera == 'en') {
                                    flag.selectByTopLevelDomain('uk');
                                }
                            }
                            function votoStelle(votoInDecimi) {
                                var stelle = Math.ceil(votoInDecimi / 2);
                                var stellePercentuale = ((stelle / 5) * 100);
                                $('.stars-inner').css('width', stellePercentuale +'%')
                            }
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
                            console.log(film.poster_path);
                            var votoInDecimi = film.vote_average;
                            var posterPath = film.poster_path;
                            var titoloIta = film.name;
                            var titoloOriginale = film.original_name;
                            var dimensioneImmagine = 'w342';
                            var urlImmagine = "https://image.tmdb.org/t/p/" + dimensioneImmagine + posterPath;
                            votoStelle(votoInDecimi);
                            creaBandiera();
                            function creaBandiera() {
                                var miaBandiera = film.original_language;
                                const parentElement = document.getElementById("bandiera");
                                const flag = new CountryFlag(parentElement);
                                flag.selectByTopLevelDomain(miaBandiera);
                                if (miaBandiera == 'en') {
                                    flag.selectByTopLevelDomain('uk');
                                }
                            }
                            function votoStelle(votoInDecimi) {
                                var stelle = Math.ceil(votoInDecimi / 2);
                                var stellePercentuale = ((stelle / 5) * 100);
                                $('.stars-inner').css('width', stellePercentuale +'%')
                            }
                    }

                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });

    });
});
