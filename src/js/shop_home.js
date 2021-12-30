const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const BASE_URL_SEARCH ='https://api.themoviedb.org/3/search/movie'
const API_URL = BASE_URL + "550" + API_KEY
const searchURL = BASE_URL + '/search/movie'+API_KEY;
const container= document.getElementById("palinsesto");
const risultatoRicerca= document.getElementById("risultati_ricerca");
const form =  document.getElementById('addMovieForm');
const search = document.getElementById('search');
var data;

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: " + JSON.parse(localStorage["utente"]));
    data = JSON.parse(localStorage["utente"])
    console.log("Data: " + data);
    var palinsesto = data.palinsesto
    console.log(palinsesto);

    //mostra palinsesto
    palinsesto.forEach(element => {
        getMovie(element.id, (response) => {
            //console.log(response);
            displayPalinsesto(response, response.id, container, element.date)
            getMoviePoster(response.backdrop_path, (responseBis) => {
                $('#moviePoster').append(responseBis)
                //console.log(responseBis);
            })
        })
    });

    //agigunge bottone per aggiungere
    //container.innerHTML += '<button width="100" height="100">Aggiungi</button>';


    //richiesta ricerca
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //pulisce risultati vecchi
        document.getElementById('risultati_ricerca').innerHTML = "";
    
        searchMovie(search.value, response => {
            console.log(response);
            response.results.forEach(element => {
                displaySearchResult(element, element.id, risultatoRicerca)
            })
        })
    
    })

})

function searchMovie(keyword, callback){
    //sostiusce spazi con +
    keyword = keyword.replace(/ /g,"+");

    $.ajax({
        type: "GET",
        url: BASE_URL_SEARCH + API_KEY+"&query="+keyword,
        data: JSON.stringify({}),
        success: callback,
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

function searchKong(callback) {
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=18cad5ee1c5382a869938ad511f2f321&query=Jack+Reacher",
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


function displayPalinsesto(result, idx, container, date) {
    date = date || 0;
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
      <p id ="genres-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <p id="demo-${idx}"></p>
      <p id="buyPrice-${idx}">prezzo acquisto:     <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path fill-rule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    </svg></button></p>
    <p id="rentPrice-${idx}">prezzo noleggio:     <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path
      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fill-rule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg></button></p>
    </div>
  </div>
</div>
`;

    // Append newyly created card element to the container
    container.innerHTML += content;

    //aapende generi alle card
    result.genres.forEach(function (entry) {
        //console.log(entry);
        //console.log(entry.name);
        $("#genresN-" + idx).append(entry.name + ' ');
    })
}  

function displaySearchResult(result, idx, container) {
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
      <p id ="genres-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <p id="demo-${idx}"></p>
      <p>Prezzo: 10€</p>

      <button id="shopAddMovieToCart-${idx}" onclick="addMovieToCart(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg></button>
    </div>
  </div>
</div>
`;

    // Append newyly created card element to the container
    container.innerHTML += content;
} 

function addMovieToCart(id){
    if (JSON.parse(localStorage.getItem("shopCart")) != null) {  //copia i film
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
}