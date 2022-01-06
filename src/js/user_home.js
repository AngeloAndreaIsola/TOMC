const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const API_URL = BASE_URL + "550" + API_KEY
const container = document.getElementById("sezioneFilm");

//Fight CLub
//https://api.themoviedb.org/3/movie/550?api_key=18cad5ee1c5382a869938ad511f2f321
//TODO: sortMoviArray()

$('document').ready(function () {
  console.log("Document ready!");
  //testHomeUser()
  loadMovieFromShops()

});

function loadMovieFromShops() {
  var movieArray = []
  var data = JSON.parse(localStorage["data"])
  data.forEach(element => {
    if (element.type == "shop") {
      for (var i = 0; i < element.palinsesto.length; i++) {
        o = {
          "movie": element.palinsesto[i]
        }
        movieArray.push(o)
        //movieArray.push(element.palinsesto[i])
      }
    }
  })
  console.log("Movie Array");
  console.log(movieArray);

  var movieArray = movieArray.filter((v, i, a) => a.findIndex(t => (t.movie.id === v.movie.id)) === i)
  console.log("Movie Array senza duplicati");
  console.log(movieArray);

  movieArray.forEach(element => {
    getMovie(element.movie.id, (response) => {
      displayMovie(response, response.id, element)
      getMoviePoster(response.poster_path, (responseBis) => {
        $('#moviePoster').append(responseBis)
        //console.log(responseBis);
      })
    })
  });



}



function testHomeUser() {
  var movieArray = ["498", "499"]
  for (var i = 500; i < 600; i++) {
    movieArray.push(i.toString())
  }
  console.log(movieArray);

  movieArray.forEach(element => {
    getMovie(element, (response) => {
      console.log(response);
      displayMovie(response, response.id, element)
      getMoviePoster(response.poster_path, (responseBis) => {
        $('#moviePoster').append(responseBis)
        //console.log(responseBis);
      })
    })
  });
}

function getMovie(code, callback) {
  $.ajax({
    type: "GET",
    url: BASE_URL + code + API_KEY,
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


function addMovieToCartBuy(id) { //TODO: AGGUNGERE OCNTROLLO PER film ducplati
  if (JSON.parse(localStorage.getItem("cart")) != null) { //copia i film
    var storedMovies = JSON.parse(localStorage.getItem("cart"));
    var o = {
      "id": id,
      "type": "acquisto"
    }
    storedMovies.push(o)
    localStorage.setItem("cart", JSON.stringify(storedMovies));
  } else { // crea un nuvo vettore
    var movies = [];
    var o = {
      "id": id,
      "type": "acquisto"
    }
    movies.push(o)
    localStorage.setItem("cart", JSON.stringify(movies));
  }
  console.log("FIlm nel carrello: ")
  console.log(JSON.parse(localStorage.getItem("cart")));
}

function addMovieToCartRent(id) { //TODO: AGGUNGERE OCNTROLLO PER film ducplati
  if (JSON.parse(localStorage.getItem("cart")) != null) { //copia i film
    var storedMovies = JSON.parse(localStorage.getItem("cart"));
    var o = {
      "id": id,
      "type": "noleggio"
    }
    storedMovies.push(o)
    localStorage.setItem("cart", JSON.stringify(storedMovies));
  } else { // crea un nuvo vettore
    var movies = [];
    var o = {
      "id": id,
      "type": "noleggio"
    }
    movies.push(o)
    localStorage.setItem("cart", JSON.stringify(movies));
  }
  console.log("FIlm nel carrello: ")
  console.log(JSON.parse(localStorage.getItem("cart")));
}


function displayMovie(result, idx, element) {
  const card = document.createElement('div');
  card.classList = 'card-body';

  // Construct card content
  const content = `
</div>
<div class="card movie_card" onclick="window.location.href='movie_info.html?id=${idx}'">
<img src="${BASE_URL_IMG + result.poster_path}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${result.title}</h5>
   <span class="movie_info" id="date-${idx}">${new Date(result.release_date).getFullYear()}</span>
   <span class="movie_info float-right"><i class="fas fa-star"></i> ${result.vote_average}</span>
</div>
</div>
`;

  // Append newyly created card element to the container
  container.innerHTML += content;
  //aggingi generi
  result.genres.forEach(function (entry) {
    //console.log(entry);
    //console.log(entry.name);
    $("#homeGenres-" + idx).append(entry.name + ' ');
  })

  //Controlla se il film sia gia acquistato o noleggiato e nasconde i bottoni
  utente = JSON.parse(localStorage["utente"])
  var movieArrayN = utente.filmNoleggiati
  var movieArrayC = utente.fimlComprati

  if (movieArrayC != null || movieArrayC != undefined) {
    movieArrayC.forEach(element => {
      if (element.id == idx) { //Ha acquistato il film nascondi tutti i bottoni
        $("#homeAddToCartBuy-" + idx).hide()
        $("#homeAddToCartRent-" + idx).hide()
        $("#rentPrice-" + idx).hide()
        $("#buyPrice-" + idx).hide()
      }
    });
  }


  //Ha noleggiato il film nascondi solo bottone noleggio
  if (movieArrayN != null || movieArrayN != undefined) {
    movieArrayN.forEach(element => {
      if (element.id == idx) {
        $("#homeAddToCartRent-" + idx).hide()
        $("#rentPrice-" + idx).hide()
      }
    });
  }





  /*
        <div class="card" style="width: 18rem;">    //1
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
  */

}