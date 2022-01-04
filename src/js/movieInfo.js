const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500/'
const BASE_URL_GET_CREDITS = 'https://api.themoviedb.org/3/movie/550/credits'
const API_URL = BASE_URL + "550" + API_KEY
const container = document.getElementById("tabellaNegozi");

$('document').ready(function () {
  console.log("Document ready!");

  //const myUrl = new URL(window.location.href)
  //myUrl.searchParams.set("id", "550")
  //console.log(myUrl);
  //console.log(myUrl.searchParams.get("id"));

  const myUrl = new URL(window.location.href)
  const id = myUrl.searchParams.get("id")

  getMovie(id, response => {
    $("#title").append(response.title)

    response.genres.forEach(element => {
      $("#generes").append(element.name)
      $("#generes").append(" ")
    });


    $("#score").append(response.vote_average)
    $("#synopsis").append(response.overview)

    getMoviePoster(response.backdrop_path, res => {
      $("#cover").attr('src', BASE_URL_IMG + response.backdrop_path)
    })

    getActors(id, e => {
      e.cast.forEach(element => {
        $("#actors").append(element.name)
        $("#actors").append(" ")

      });

    })
  })

  var shopList = []
  var data = JSON.parse(localStorage["data"])
  data.forEach(element => {
    if (element.type == "shop") {
      for (var i = 0; i < element.palinsesto.length; i++) {
        if (element.palinsesto[i].id == id) {
          shopList.push(element.palinsesto[i])
        }
      }
    }
  })
  console.log("Shoplist: ");
  console.log(shopList);

  shopList.forEach(element => {
    displayShops(id, element)
  })
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


function displayShops(idx, element) {
  // Construct card content
  const content = `

    <tr>
    <td</td>
    <td>${element.shop}</td>
    <td>${element.price/100}</td>
    <td><button id="homeAddToCartBuy-${element.shop}" onclick="addMovieToCartBuy(${idx}, '${element.shop}', ${element.price})" type="button" class="buy btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg></button></td>
    <td>${element.priceRent/100}</td>
    <td><button id="homeAddToCartRent-${element.shop}" onclick="addMovieToCartRent(${idx}, '${element.shop}', ${element.price})" type="button" class="rent btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
    </svg></button></td>
    </tr>
  `;

  // Append newyly created card element to the container
  container.innerHTML += content;

  //se è gia nel carrello disabilità tutti pulsanti
   utente = JSON.parse(localStorage["utente"])
  var carrello
  if (JSON.parse(localStorage["cart"]) != null || localStorage["cart"] != undefined) {
    carrello = JSON.parse(localStorage["cart"])
    console.log(carrello);
    carrello.forEach(element => {
      if (element.id == idx) {
        console.log("Il film è gia nel carrello, non è possibile aggiungerlo di nuovo");
        $(".buy").prop("disabled", true);
        $(".rent").prop("disabled", true);
      }
    })
  }

  //se lo ha noleggiato disabilita pulsanti noleggio
  if(utente.filmNoleggiati!= null || utente.filmNoleggiati != undefined){
    utente.filmNoleggiati.forEach(element => {
      if (element.id == idx) {
        console.log("Il film è gia stato noleggiato, non è possibile noleggiarlo di nuovo");
        $(".rent").prop("disabled", true);
      }
    })
  }


  //se lo ha acquistato disabilita tutti i pulanti
  if(utente.fimlComprati!= null || utente.fimlComprati != undefined){
    utente.fimlComprati.forEach(element => {
      if (element.id == idx) {
        console.log("Il film è gia stato comprato, non è possibile noleggiarlo di nuovo");
        $(".buy").prop("disabled", true);
        $(".rent").prop("disabled", true);
      }
    })
  }


}


function addMovieToCartBuy(id, shop, price) { //TODO: AGGUNGERE OCNTROLLO PER film ducplati
  if (JSON.parse(localStorage.getItem("cart")) != null) { //copia i film
    var storedMovies = JSON.parse(localStorage.getItem("cart"));
    var o = {
      "id": id,
      "type": "acquisto",
      "shop": shop,
      "price": price
    }
    storedMovies.push(o)
    localStorage.setItem("cart", JSON.stringify(storedMovies));
  } else { // crea un nuvo vettore
    var movies = [];
    var o = {
      "id": id,
      "type": "acquisto",
      "shop": shop,
      "price": price
    }
    movies.push(o)
    localStorage.setItem("cart", JSON.stringify(movies));
  }
  console.log("FIlm nel carrello: ")
  console.log(JSON.parse(localStorage.getItem("cart")));
  console.log("Il film è gia nel carrello, non è possibile aggiungerlo di nuovo");
  $(".buy").prop("disabled", true);
  $(".rent").prop("disabled", true);
}

function addMovieToCartRent(id, shop, price) { //TODO: AGGUNGERE OCNTROLLO PER film ducplati
  if (JSON.parse(localStorage.getItem("cart")) != null) { //copia i film
    var storedMovies = JSON.parse(localStorage.getItem("cart"));
    var o = {
      "id": id,
      "type": "noleggio",
      "shop": shop,
      "price": price
    }
    storedMovies.push(o)
    localStorage.setItem("cart", JSON.stringify(storedMovies));
  } else { // crea un nuvo vettore
    var movies = [];
    var o = {
      "id": id,
      "type": "noleggio",
      "shop": shop,
      "price": price
    }
    movies.push(o)
    localStorage.setItem("cart", JSON.stringify(movies));
  }
  console.log("FIlm nel carrello: ")
  console.log(JSON.parse(localStorage.getItem("cart")));
  console.log("Il film è gia nel carrello, non è possibile aggiungerlo di nuovo");
  $(".buy").prop("disabled", true);
  $(".rent").prop("disabled", true);
}


/*
  <button id="homeAddToCartBuy-${idx}" onclick="addMovieToCartBuy()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg></button>
    <p id="buyPrice-${idx}">price</p>
    <button id="homeAddToCartRent-${idx}" onclick="addMovieToCartRent()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
  </svg></button>
  <p id="rentPrice-${idx}">price</p>
*/