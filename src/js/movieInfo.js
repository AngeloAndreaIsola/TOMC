const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const API_URL = BASE_URL + "550" + API_KEY


$('document').ready(function () {
    console.log("Document ready!");

    //const myUrl = new URL(window.location.href)
    //myUrl.searchParams.set("id", "550")
    //console.log(myUrl);
    //console.log(myUrl.searchParams.get("id"));

    const myUrl = new URL(window.location.href)
    const id= myUrl.searchParams.get("id")

    getMovie(id,response=>{
        console.log(response);
        $("#title").append(response.title)
        $("#generes").append(response.genres)
        $("#actors").append(response.actors)
        $("#score").append(response.vote_average)
        $("#synopsis")

        getMoviePoster(response.backdrop_path, res => {
            $("#cover").attr('src',  BASE_URL_IMG + response.backdrop_path)
        })
    })


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