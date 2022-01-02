data = JSON.parse(localStorage["utente"])
const container = document.getElementById("tabellaCarrello-body");
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'

$('document').ready(function () {
  console.log("Document ready!");
  console.log("Film nel carrello:");
  console.log(JSON.parse(localStorage["cart"]));

  // loadMovieFromShops()
  var movieArray = []
  var data = JSON.parse(localStorage["data"])
  data.forEach(element => {
    if (element.type == "shop") {
      for (var i = 0; i < element.palinsesto.length; i++) {
        o = {
          "movie": element.palinsesto[i],
          "shop": element.shopName
        }
        movieArray.push(o)
        //movieArray.push(element.palinsesto[i])
      }
    }
  })
  console.log("Movie Array");
  console.log(movieArray)



  var storedMovies = JSON.parse(localStorage.getItem("cart"));
  if (storedMovies == null) {
    $("#tabellaCarrello").hide()
    $("#carrelloVuoto").show()
  } else {
    storedMovies.forEach(element => {
      //find movie in json
      var currentMovie
      movieArray.forEach(e => {
        if (e.movie.id == element.id) {
          currentMovie = e
        }
      })

      //display movie in cart
      getMovie(element.id, response => {
        console.log(response);
        displayMovieInCart(element.id, element.type, currentMovie, response.title  )
      })
    })
  }



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



function displayMovieInCart(idx, type, element, title) {
  // Construct card content
  const content = `

    <tr>
    <td scope="row">
    <button id="remove-${idx}" onclick="removeMovieFromCart(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg></button></td>
    <td>${idx}</td>
    <td>${title}</td>
    <td>${type}</td>
    <td>${element.shop}</td>
    <td>${element.movie.price/100 + "€"}</td>
    </tr>
  `;

  // Append newyly created card element to the container
  container.innerHTML += content;
}

function removeMovieFromCart(idx) {
  //aggiorna la lista di film nel carrello
  var storedMovies = JSON.parse(localStorage.getItem("cart"));
  var tempMovies = [];
  storedMovies.forEach(element => {
    if (element.id != idx) {
      tempMovies.push(element)
    }
  })
  localStorage.setItem("cart", JSON.stringify(tempMovies));
  console.log("FIlm nel carrello: " + JSON.parse(localStorage.getItem("cart")));
  storedMovies = tempMovies

  //pulisce html da tutti gli elementi vecchi
  $("#tabellaCarrello-body tr").remove()

  //aggiorna view del carrello 
  storedMovies.forEach(element => {
    displayMovieInCart(element.id)
  })
}

//TODO: IMPEDIRE DI COMPRARE UN FILM GIA ACQUISTATO O DI NOLGGIARE FIML ANCORA IN NOLEGGIO
function purchaese() {
  var o
  var cart = JSON.parse(localStorage.getItem("cart"));
  var libreria = JSON.parse(localStorage["utente"])
  console.log(JSON.parse(localStorage["utente"]));
  console.log(JSON.parse(localStorage.getItem("cart")));
  cart.forEach(element => {
    //aggiungi a lista di fiml comprati/noleggiati
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var now = date + ' ' + time;


    var price = 20
    o = {
      "id": element.id,
      "type": element.type,
      "date": now,
      "price": price
    }
    
    if(element.type == "acquisto"){
      libreria.fimlComprati.push(o)
    }else if (element.type == "noleggio"){
      libreria.filmNoleggiati.push(o)
    }
  })

  //salva e vuota carrello

  data =  JSON.parse(localStorage.getItem("data"));
  for (i=0; i<data.length; i++){
    if( data[i].email == libreria.email){
      data[i] = libreria
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("utente", JSON.stringify(libreria));
  localStorage.setItem("cart", null);
  $("#tabellaCarrello-body tr").remove()
}