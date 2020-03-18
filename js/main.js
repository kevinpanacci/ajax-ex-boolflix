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
                        var stelle = Math.ceil(votoInDecimi / 2)%;
                        console.log(stelle);
                    }
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });

    });


//     DA STUDIARE PER UTILIZZARE LE STELLE CON %.
//     const ratings = {
//       hotel_a : 2.8,
//       hotel_b : 3.3,
//       hotel_c : 1.9,
//       hotel_d : 4.3,
//       hotel_e : 4.74
//     };
//
//     const starTotal = 5;
//
// for(const rating in ratings) {
//   // 2
//   const starPercentage = (ratings[rating] / starTotal) * 100;
//   // 3
//   const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//   // 4
//   document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
// }


});
