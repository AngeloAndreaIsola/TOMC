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
        movieArray.push(element.palinsesto[i])
      }
    }
  })

  console.log(movieArray);

  movieArray.forEach(element => {
    getMovie(element.id, (response) => {
      console.log(response);
      displayMovie(response, response.id)
      getMoviePoster(response.backdrop_path, (responseBis) => {
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
      displayMovie(response, response.id)
      getMoviePoster(response.backdrop_path, (responseBis) => {
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


function addMovieToCart(id) {
  if (JSON.parse(localStorage.getItem("cart")) != null) {
    var storedMovies = JSON.parse(localStorage.getItem("cart"));
    if (!storedMovies.includes(id)){
      storedMovies.push(id)
    }
    localStorage.setItem("cart", JSON.stringify(storedMovies));
  } else {
    var movies = [];
    movies.push(id)
    localStorage.setItem("cart", JSON.stringify(movies));
  }
  console.log("FIlm nel carrello: " + JSON.parse(localStorage.getItem("cart")));
}


function displayMovie(result, idx) {
  const card = document.createElement('div');
  card.classList = 'card-body';

  // Construct card content
  const content = `
  <div class="card">
  <div class="crop">
  <img id="moviePoster" src="${BASE_URL_IMG + result.backdrop_path}" style="width=200px"></img>
  </div>
  <div class="card-header" id="heading-${idx}">
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">

              </button>
    </h5>
  </div>

  <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
    <div class="card-body">

      <h5>${result.title}</h5>
      <p id="homeGenres-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <button id="homeAdd-${idx}" onclick="addMovieToCart(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg></button>
    </div>
  </div>
</div>
`;

  // Append newyly created card element to the container
  container.innerHTML += content;

  result.genres.forEach(function (entry) {
    //console.log(entry);
    //console.log(entry.name);
    $("#homeGenres-" + idx).append(entry.name + ' ');
  })





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