data = JSON.parse(localStorage["utente"])
var movieArray
const container = document.getElementById("cronologiaAcquisti");
const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
var alphaExp = /^[a-zA-Z]+ [a-zA-Z]+$/;

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: " + JSON.parse(localStorage["utente"]));


    document.getElementById("profileName").innerHTML = data.name;
    document.getElementById("profileLastname").innerHTML = data.lastname;
    document.getElementById("profileEmail").innerHTML = data.email;

    document.getElementById("numeroCarta").innerHTML = data.dettagliPAgamento.numeroCarta;
    document.getElementById("Intestatario").innerHTML = data.dettagliPAgamento.nomeCarta;
    document.getElementById("cvv").innerHTML = data.dettagliPAgamento.cvv;
    document.getElementById("expM").innerHTML = data.dettagliPAgamento.expM;
    document.getElementById("expA").innerHTML = data.dettagliPAgamento.expY;


    // prende lista di tutti i film acqustati
    data = JSON.parse(localStorage["utente"])
    var movieArrayN = data.filmNoleggiati
    var movieArrayC = data.fimlComprati
    console.log(movieArrayN);
    console.log(movieArrayC);

    //unisce array, il risultato è nel primo
    // Array.prototype.push.apply(movieArrayN, movieArrayC);
    // movieArray = movieArrayN
    // console.log("movie array:");
    // console.log(movieArray);


    movieArray = data.history
    console.log(movieArray);
    movieArray.forEach(element => {
        getMovie(element.id, response => {
            displayMovieInCart(element.id, element.type, element, response.title)
        })
    });


})

function modificaNome() {
    var newNome = prompt("Nuovo nome: ");
    if (newNome != null || newNome == "" && newNome.match('/^[A-Za-z]+$/')) {
        document.getElementById("profileName").innerHTML = newNome

        //salva cambiamento per utente
        var data = JSON.parse(localStorage["utente"])
        data.name = newNome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));
    }
}

//TODO: Non far modificare campo quando è nullo o withespace
function modificaCognome() {
    var newCognome = prompt("Nuovo cognome: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("profileLastname").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.lastname = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));
    }
}

function modificaNumeroCarta() {
    var newCognome = prompt("Nuovo numero carta: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("numeroCarta").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.numeroCarta = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    }
}

function modificaIntestatario() {
    var newCognome = prompt("Nuovo nome intestatario: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("Intestatario").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.nomeCarta = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    }
}

function modificaMese() {
    var newCognome = prompt("Nuovo mese di scadenza: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("expM").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.expM = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    }
}

function modificaAnno() {
    var newCognome = prompt("Nuovo anno di scadenza: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("expY").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.expY = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    }
}

function modificaCvv() {
    var newCognome = prompt("Nuovo mese cvv: ");
    if (newCognome != null || newCognome == "" && newCognome.match(alphaExp)) {
        document.getElementById("cvv").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.cvv = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    }
}

function displayMovieInCart(idx, type, element, title) {
    // Construct card content
    const content = `
  
      <tr>
      <td scope="row">
      <td>${idx}</td>
      <td>${title}</td>
      <td>${type}</td>
      <td>${element.date}</td>
      <td>${element.shop}</td>
      <td>${element.price/100 + "€"}</td>
      </tr>
    `;

    // Append newyly created card element to the container
    container.innerHTML += content;
}

function deleteProfile() {
    var data = JSON.parse(localStorage["data"])
    var utente = JSON.parse(localStorage["utente"])
    var newData = []

    for (var i = 0; i < data.length; i++) {
        if (data[i].email != utente.email) {
            newData.push(data[i])
        }
    }

    localStorage.setItem('data', JSON.stringify(newData));
    localStorage.removeItem("utente");
    console.log("Profilo cancellato");
    window.location.replace("./login.html");
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