data = JSON.parse(localStorage["utente"])
var movieArray
const container = document.getElementById("cronologiaAcquisti");

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: " + JSON.parse(localStorage["utente"]));


    document.getElementById("profileName").innerHTML = data.name;
    document.getElementById("profileLastname").innerHTML = data.lastname;
    document.getElementById("profileEmail").innerHTML = data.email;


    // prende lista di tutti i film acqustati
    data = JSON.parse(localStorage["utente"])
    var movieArrayN = data.filmNoleggiati
    var movieArrayC = data.fimlComprati
    console.log(movieArrayN);
    console.log(movieArrayC);

    //unisce array, il risultato è nel primo
    Array.prototype.push.apply(movieArrayN,movieArrayC);
    movieArray = movieArrayN
    console.log("movie array:");
    console.log(movieArray);
    movieArray.forEach(element => {
        displayMovieInCart(element.id, "xxx",element, element.title)
    });


})

function modificaNome() {
    var newNome = prompt("Please enter your name");
    if (newNome != null || newNome == "" || newNome == "") {
        document.getElementById("profileName").innerHTML = newNome

        var data = JSON.parse(localStorage["utente"])
        data.name = newNome
        localStorage.setItem('utente', JSON.stringify(data));

    }  
}

//TODO: Non far modificare campo quando è nullo o withespace
function modificaCognome() {
    var newCognome = prompt("Please enter your name");
    if (newCognome != null || newCognome == "" || newCognome == "") {
        document.getElementById("profileLastname").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.lastname = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

    }  
}

function displayMovieInCart(idx, type, element, title) {
    // Construct card content
    const content = `
  
      <tr>
      <td scope="row">
      <td>${idx}</td>
      <td>titolo</td>
      <td>type</td>
      <td>data</td>
      <td>${element.shop}</td>
      <td>${element.price/100 + "€"}</td>
      </tr>
    `;
  
    // Append newyly created card element to the container
    container.innerHTML += content;
  }

