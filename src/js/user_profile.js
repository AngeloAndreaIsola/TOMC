data = JSON.parse(localStorage["utente"])
var movieArray
const container = document.getElementById("cronologiaAcquisti");

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
      <td>${element.price + "€"}</td>
      </tr>
    `;
  
    // Append newyly created card element to the container
    container.innerHTML += content;
  }

  function deleteProfile(){
    var data = JSON.parse(localStorage["data"])
    var utente = JSON.parse(localStorage["utente"])
    var newData = []

    for(var i=0; i<data.length; i++){
        if(data[i].email != utente.email){
            newData.push(data[i])
        }
    }
    
    localStorage.setItem('data', JSON.stringify(newData));
    localStorage.removeItem("utente");
    console.log("Profilo cancellato");
    window.location.replace("./login.html");
}