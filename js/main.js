$(document).ready(function (){
    $('.searchbar-button').click(function() {
        var nomeInserito = $('#searchbar').val();
        console.log(nomeInserito);
    });

    var nome = $('#searchbar').val();
    console.log(nome); //COSI FUNZIONA


    var apiBaseUrl = 'https://api.themoviedb.org/3';
    $.ajax({
        url: apiBaseUrl + '/search/movie',
        data: {
            api_key: '6d0fd5c96501c78452d6d55bbbef0583',
            query: nome,
            language: 'it-IT'
        },
        method: 'GET',
        success: function(data){
            console.log(data);
            var films = data.results;
            for (var i = 0; i < films.length; i++) {
                var film = films[i];
                console.log(film.title);
            }
        },
        error: function (err) {
            alert('BOOM');
        }
    });


});
