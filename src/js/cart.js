data = JSON.parse(localStorage["utente"])
const container = document.getElementById("tabellaCarrello-body");

$('document').ready(function () {
  console.log("Document ready!");
  console.log("Film nel carrello:");
  console.log(JSON.parse(localStorage["cart"]));

  var storedMovies = JSON.parse(localStorage.getItem("cart"));
  if (storedMovies == null) {
    $("#tabellaCarrello").hide()
    $("#carrelloVuoto").show()
  } else {
    storedMovies.forEach(element => {
      displayMovieInCart(element)
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



function displayMovieInCart(idx) {

  // Construct card content
  const content = `

    <tr>
    <td scope="row">
    <button id="remove-${idx}" onclick="removeMovieFromCart(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg></button></td>
    <td>${idx}</td>
    <td><button></button></td>
    <td></td>
    <td>20€</td>
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
    if (element != idx) {
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
    displayMovieInCart(element)
  })
}