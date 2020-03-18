$(document).ready(function (){
    $('.searchbar-button').click(function() {
        var nomeInserito = $('#searchbar').val();
        // console.log(nomeInserito);
        var apiBaseUrl = 'https://api.themoviedb.org/3';

        $.ajax({
            url: apiBaseUrl + '/search/movie',
            data: {
                api_key: '6d0fd5c96501c78452d6d55bbbef0583',
                query: nomeInserito,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data){
                console.log(data);
                var films = data.results;
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    console.log(film.title);
                    console.log(film.original_title);
                    console.log(film.original_language);
                    console.log(film.vote_average);
                    var votoInDecimi = film.vote_average;
                    votoStelle(votoInDecimi);


                    function votoStelle(votoInDecimi) {
                        var stelle = Math.ceil(votoInDecimi / 2);
                        console.log(stelle);
                        var stellePercentuale = ((stelle / 5) * 100);
                        console.log(stellePercentuale);
                        $('.stars-inner').css('width', 'stellePercentuale' + '%' )
                    }
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });

    });
});
