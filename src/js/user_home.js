const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const API_URL = BASE_URL + "550" + API_KEY
const container = document.getElementById( "sezioneFilm" );

//Fight CLub
//https://api.themoviedb.org/3/movie/550?api_key=18cad5ee1c5382a869938ad511f2f321

$('document').ready(function () {
  console.log("Document ready!");
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
});

//TODO: sortMoviArray()

/* function loadMovieList(){
  $.getJSON("data/movieList.json", function(json) {
		// this will show the info it in firebug console
	   console.log(json);
     return json
   });
} */



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
      <p>${result.genres}</p>
      <p>${result.vote_average}</p>
      <p>${result.release_date}</p>
    </div>
  </div>
</div>
`;

  // Append newyly created card element to the container
  container.innerHTML += content;

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