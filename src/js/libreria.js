const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const API_URL = BASE_URL + "550" + API_KEY
const containerC = document.getElementById("sezioneFilmComprati");
const containerN = document.getElementById("sezioneFilmNoleggiati");
var data;


$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: " + JSON.parse(localStorage["utente"]));
    data = JSON.parse(localStorage["utente"])
    console.log("Data: " + data);
    var movieArrayN = data.filmNoleggiati
    var movieArrayC = data.fimlComprati
    console.log(movieArrayN);
    console.log(movieArrayC);

    //Mostra film noleggiati
    movieArrayN.forEach(element => {
        getMovie(element.id, (response) => {
            displayMovieN(response, response.id, containerN, element.date)
            getMoviePoster(response.poster_path, (responseBis) => {
                $('#moviePoster').append(responseBis)
                //console.log(responseBis);
            })
            displayTimer(element.date, element.id)
        })
    });

    //Mostra film acquistati
    movieArrayC.forEach(element => {
        getMovie(element.id, (response) => {
            displayMovieC(response, response.id, containerC)
            getMoviePoster(response.backdrop_path, (responseBis) => {
                $('#moviePoster').append(responseBis)
                //console.log(responseBis);
            })
        })
    });
});

function getMovie(code, callback) {
    $.ajax({
        type: "GET",
        url: BASE_URL + code + API_KEY +"&language=it",
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

//data è opzionae
function displayMovieN(result, idx, container, date) {
    date = date || 0;
    const card = document.createElement('div');
    card.classList = 'card-body';

    // Construct card content
    const content = `
    <!--
  <div class="card">
  <div class="crop">
  <img id="moviePoster" ></img>
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
      <p id ="libGenresN-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <p id="demo-${idx}"></p>
      <button class="btn btn-primary"id="playRent-${idx}"><a href="data/logoIntro.mp4?id=${idx}"" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
    </svg></button>
    </div>
  </div>
</div>
-->

</div>
<div class="card movie_card">
<img src="${BASE_URL_IMG + result.poster_path}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${result.title}</h5>
   <span class="movie_info" id="date-${idx}">${new Date(result.release_date).getFullYear()}</span>
   <span class="movie_info float-right"><i class="fas fa-star"></i> ${result.vote_average}</span>
   <p id ="libGenresN-${idx}"></p>
   <p id="demo-${idx}"></p>
   <button id="playRent-${idx}" class="btn btn-outline-primary"> <a href="data/logoIntro.mp4?id=${idx}"" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
   <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
 </svg></button>
   </div>
</div>
`;

    // Append newyly created card element to the container
    container.innerHTML += content;


    result.genres.forEach(function (entry) {
        $("#libGenresN-" + idx).append(entry.name + ' ');
    })
}

function displayMovieC(result, idx, container) {
    const card = document.createElement('div');
    card.classList = 'card-body';

    // Construct card content
    const content = `
    <!--
  <div class="card">
  <div class="crop">
  <img id="moviePoster"></img>
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
      <p id="libGenresC-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <button> <a href="data/logoIntro.mp4?id=${idx}"" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
    </svg></button>
    </div>
  </div>
</div>
-->

</div>
<div class="card movie_card">
<img src="${BASE_URL_IMG + result.poster_path}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${result.title}</h5>
   <span class="movie_info" id="date-${idx}">${new Date(result.release_date).getFullYear()}</span>
   <span class="movie_info float-right"><i class="fas fa-star"></i> ${result.vote_average}</span>
   <p id ="libGenresC-${idx}"></p>
   <p id="demo-${idx}"></p>
   <button class="btn btn-outline-primary"> <a href="data/logoIntro.mp4?id=${idx}"" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
   <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
 </svg></button></div>
</div>
`;

    // Append newyly created card element to the container
    container.innerHTML += content;

    result.genres.forEach(function (entry) {
        $("#libGenresC-" + idx).append(entry.name + ' ');
    })
}

function displayTimer(date, idx) {
    //TODO: gestire data di acquisto e scadenza
    // Set the date we're counting down to
    var scandeza = new Date(date).getTime() + (60 * 60 * 1000 * 72);

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();
        if (now != null) {
            // Find the distance between now and the count down date
            var distance = scandeza - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("demo-" + idx).innerHTML = days + "d " + hours + "h " +
                minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo-" + idx).innerHTML = "SCADUTO";
                $("#demo-"+idx).addClass("badge badge-danger")
                $("#playRent-"+idx).hide()
            }
        }
    }, 1000);
}
