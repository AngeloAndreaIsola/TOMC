data = JSON.parse(localStorage["data"])
utente = JSON.parse(localStorage["utente"])
const container = document.getElementById("tabellaCarrello-body");
const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const API_KEY = '?api_key=18cad5ee1c5382a869938ad511f2f321'

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Film nel carrello del negozio:");
    console.log(JSON.parse(localStorage["shopCart"]));



    var storedMovies = JSON.parse(localStorage.getItem("shopCart"));
    if (storedMovies == null) {
        $("#shopCartButton").prop("disabled",true);
    } else {
        $("#shopCartButton").prop("disabled",false);
        storedMovies.forEach(element => {
            //display movie in cart
            getMovie(element.id, response => {
                console.log(response);
                displayMovieInCart(element.id, element.type, response.title)
            })
        })
    }



})

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



function displayMovieInCart(idx, type, title) {
    // Construct card content
    const content = `

    <tr>
    <td scope="row">
    <button id="remove-${idx}" onclick="removeMovieFromCart(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg></button></td>
    <td>${idx}</td>
    <td>${title}</td>
    <td><input id="prezzoAcquisto-${idx}" type="number" onkeypress="return event.charCode >= 48" min="1" required></td>
    <td><input id="prezzoNoleggio-${idx}" type="number" onkeypress="return event.charCode >= 48" min="1" required></td>
    <td>10€</td>
    </tr>
  `;

    // Append newyly created card element to the container
    container.innerHTML += content;
}

function removeMovieFromCart(idx) {
    //aggiorna la lista di film nel carrello
    var storedMovies = JSON.parse(localStorage.getItem("shopCart"));
    var tempMovies = [];
    storedMovies.forEach(element => {
        if (element.id != idx) {
            tempMovies.push(element)
        }
    })
    localStorage.setItem("shopCart", JSON.stringify(tempMovies));
    console.log("FIlm nel carrello:");
    console.log(JSON.parse(localStorage.getItem("shopCart")));
    storedMovies = tempMovies

    //pulisce html da tutti gli elementi vecchi
    $("#tabellaCarrello-body tr").remove()

    //aggiorna view del carrello 
    storedMovies.forEach(element => {
        displayMovieInCart(element.id)
    })
}

function removeMovieFromCart(idx) {
    //aggiorna la lista di film nel carrello
    var storedMovies = JSON.parse(localStorage.getItem("shopCart"));
    var tempMovies = [];
    storedMovies.forEach(element => {
        if (element.id != idx) {
            tempMovies.push(element)
        }
        console.log(tempMovies);
    })
    localStorage.setItem("shopCart", JSON.stringify(tempMovies));
    console.log("FIlm nel carrello: " + JSON.parse(localStorage.getItem("shopCart")));
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
    var cart = JSON.parse(localStorage.getItem("shopCart"));
    var libreria = JSON.parse(localStorage["utente"])
    console.log(JSON.parse(localStorage["utente"]));
    console.log(JSON.parse(localStorage.getItem("shopCart")));

    //se non ha inserito i prezzi blocca
    // if((".priceInput").val()==null){
    //     alert("Non hai inserito il prezzo a tutti i film")
    //     return
    // }

    cart.forEach(element => {
        //aggiungi a lista di fiml comprati/noleggiati
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var now = date + ' ' + time;


        o = {
            "id": element.id,
            "type": element.type,
            "date": now,
            "price": $("#prezzoAcquisto-"+element.id).val(),
            "priceRent": $("#prezzoNoleggio-"+element.id).val(),
            "shop": libreria.shopName
        }

        libreria.palinsesto.push(o)
        //TODO: AGGIUGNE FILM SOLO AD UTENTE E NON A DATA


        //salva per utente e data
        localStorage.setItem("utente", JSON.stringify(libreria));
        data.forEach(user => {
            if (user.email == utente.email) {
                console.log("MATCH FOUND");
                user.palinsesto = libreria.palinsesto
                localStorage.setItem("data", JSON.stringify(data));
            }
        })

    })



    //Svuota carrello
    localStorage.setItem("shopCart", null);
    $("#tabellaCarrello-body tr").remove()
}