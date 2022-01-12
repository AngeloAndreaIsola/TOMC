const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const BASE_URL_GET_CREDITS = 'https://api.themoviedb.org/3/movie/550/credits'
const API_URL = BASE_URL + "550" + API_KEY
const container = document.getElementById("tabellaNegozi");
const myUrl = new URL(window.location.href)
const id = myUrl.searchParams.get("id")

$('document').ready(function () {
    console.log("Document ready!");

    //const myUrl = new URL(window.location.href)
    //const id = myUrl.searchParams.get("id")

    getMovie(id, response => {
        $("#title").append(response.title)

        response.genres.forEach(element => {
            $("#generes").append("<span class='badge badge-pill badge-info'>" + element.name + "</span>");
        });


        $("#score").append(response.vote_average)
        $("#synopsis").append(response.overview)

        getMoviePoster(response.poster_path, res => {
            $("#cover").attr('src', BASE_URL_IMG + response.poster_path)
            if (response.poster_path == null || response.poster_path == undefined) {
                $("#cover").attr("src", "https://www.mastromediapix.it/88819-large_default/caruba-ciak-cinematografico.jpg");
            }
        })

        getActors(id, e => {
            console.log(e);
            e.cast.forEach(function (element, i) {
                if (i === e.cast.length - 1) {
                    $("#actors").append(element.name)
                } else {
                    $("#actors").append(element.name)
                    $("#actors").append(", ")
                }
                i++
            });

            e.crew.forEach(element => {
                if (element.job == "Director") {
                    $("#director").append(element.name)
                    $("#director").append(" ")
                }
            })
        })
    })

    utente = JSON.parse(localStorage["utente"])

    //se lo ho gia acquistato disabilità
    //se è nel carrello disabilita
    //se lo acquisto disabilita

    //se è gia acquistato non lo fa aggingeere
    utente.palinsesto.forEach(element => {
        if (element.id == id) {
            console.log("lo hai gia comprato");
            $("#addToCart").prop("disabled", true);
        }
    })

    //se è gia nel carello non lo fa aggiungere
    if (JSON.parse(localStorage.getItem("shopCart")) != null) { //copia i film
        carello = JSON.parse(localStorage.getItem("shopCart"))
        carello.forEach(element => {
            if (element.id == id) {
                console.log("Lo hai bia nel carrello");
                $("#addToCart").prop("disabled", true);
            }
        })
    }


})


function getActors(code, callback) {
    $.ajax({
        type: "GET",
        url: BASE_URL + code + '/credits' + API_KEY,
        data: JSON.stringify({}),
        success: callback,
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

function getMovie(code, callback) {
    $.ajax({
        type: "GET",
        url: BASE_URL + code + API_KEY + "&language=it",
        data: JSON.stringify({}),
        success: callback,
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

function getMoviePoster(path, callback) {
    $.ajax({
        type: "GET",
        url: BASE_URL_IMG + path,
        data: JSON.stringify({}),
        success: callback,
        error: function (error) {
            if (path == null) {
                console.error("Poster non disponibile");
            } else {
                console.log(error.responseText);
            }
        }
    })
}

function addMovieToCart(id) {
    if (JSON.parse(localStorage.getItem("shopCart")) != null) { //copia i film
        var storedMovies = JSON.parse(localStorage.getItem("shopCart"));
        var o = {
            "id": id
        }
        storedMovies.push(o)
        localStorage.setItem("shopCart", JSON.stringify(storedMovies));
    } else { // crea un nuvo vettore
        var movies = [];
        var o = {
            "id": id
        }
        movies.push(o)
        localStorage.setItem("shopCart", JSON.stringify(movies));
    }
    console.log("FIlm nel carrello: ")
    console.log(JSON.parse(localStorage.getItem("shopCart")));

    $("#shopAddMovieToCart-" + id).prop("disabled", true);
}