const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const API_URL = BASE_URL + "550" + API_KEY
const container= document.getElementById("palinsesto");
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
            console.log(response);
            displayPalinsesto(response, response.id, container, element.date)
            getMoviePoster(response.backdrop_path, (responseBis) => {
                $('#moviePoster').append(responseBis)
                //console.log(responseBis);
            })
        })
    });

    //agigunge bottone per aggiungere
    container.innerHTML += '<button width="100" height="100">Aggiungi</button>';

})

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

//data è opzionae
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
      <p id ="libGenresN-${idx}"></p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
      <p id="demo-${idx}"></p>
    </div>
  </div>
</div>
`;

    // Append newyly created card element to the container
    container.innerHTML += content;


    result.genres.forEach(function (entry) {
        console.log(entry);
        console.log(entry.name);
        $("#libGenresN-" + idx).append(entry.name + ' ');
    })
}