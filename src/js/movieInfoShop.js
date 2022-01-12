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
    var prezzoNoleggio
    var prezzoAcquisto

    utente.palinsesto.forEach(e => {
        if(e.id == id){
            prezzoNoleggio = e.priceRent
            prezzoAcquisto = e.price
        }
    })
    
    $("#noleggio").text("Prezzo noleggio: "+prezzoNoleggio/100)
    $("#acquisto").text("Prezzo acquisto: "+prezzoAcquisto/100)
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

function removeMovieFromPalinsesto() {
    //aggiorna la lista di film nel carrello
    var utente = JSON.parse(localStorage.getItem("utente"));
    var tempMovies = [];
    utente.palinsesto.forEach(element => {
      if (element.id != id) {
        tempMovies.push(element)
      }
    })
    utente.palinsesto = tempMovies
  
  
    //salva
    data = JSON.parse(localStorage.getItem("data"));
    for (i = 0; i < data.length; i++) {
      if (data[i].email == utente.email) {
        data[i] = utente
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("utente", JSON.stringify(utente));
  
    $("#card-" + id).remove()
  
    console.log(id + " rimosso dal palinsesto");
    window.location.replace("./home_shop.html");
  
  }
  
  function modifyBuyPrice() {
    console.log("modificando prezzo acquisto di:  " + id);
  
    var newCognome = prompt("Nuovo prezzo di acquisto (intero in centesimi): ");
    if (newCognome.match('^[0-9]*[1-9][0-9]*$')) {  //newCognome != null || newCognome == "" || newCognome == "" &&
      document.getElementById("acquisto").innerHTML = "prezzo acquisto: " + newCognome/100
  
      var utente = JSON.parse(localStorage.getItem("utente"));
      utente.palinsesto.forEach(element => {
        if (element.id == id) {
          element.price = newCognome
        }
      })
      localStorage.setItem('utente', JSON.stringify(utente));
  
      var data = JSON.parse(localStorage.getItem("data"));
      for(var i=0; i<data.length; i++) {
        if(data[i].email == utente.email){
          console.log("trovato");
          data[i] = utente
        }
      }
      localStorage.setItem('data', JSON.stringify(data));
    }else{
      alert("Prezzo non valido")
    }
  }
  
  function modifyRentPrice() {
    console.log("modificando prezzo noleggio di:  " + id);
    var newCognome = prompt("Nuovo prezzo di noleggio (intero in centesimi): ");
    if (newCognome.match('^[0-9]*[1-9][0-9]*$')) {
      document.getElementById("noleggio").innerHTML = "prezzo noleggio: " + newCognome/100
  
      var utente = JSON.parse(localStorage.getItem("utente"));
      utente.palinsesto.forEach(element => {
        if (element.id == id) {
          element.priceRent = newCognome
        }
      })
      localStorage.setItem('utente', JSON.stringify(utente));
  
      var data = JSON.parse(localStorage.getItem("data"));
      for(var i=0; i<data.length; i++) {
        if(data[i].email == utente.email){
          console.log("trovato");
          data[i] = utente
        }
      }
      localStorage.setItem('data', JSON.stringify(data));
    }
  
  }